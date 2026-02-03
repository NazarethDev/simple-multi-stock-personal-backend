import Product from "../models/productSchema.js";

export async function getExpiredProductsByStoreRepository(months) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (months * 30));

    return Product.aggregate([
        {
            $match: {
                expiresAt: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $project: {
                quantityArray: { $objectToArray: "$quantity" }
            }
        },
        { $unwind: "$quantityArray" },
        {
            $match: { "quantityArray.v": { $gt: 0 } }
        },
        {
            $group: {
                _id: "$quantityArray.k",
                // Soma a quantidade de itens físicos por loja
                totalExpiredProducts: { $sum: "$quantityArray.v" }
            }
        },
        { $sort: { totalExpiredProducts: -1 } }
    ]);
};

export async function getExpiredCostByStoreRepository(months) {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setMonth(now.getMonth() - months);

    const result = await Product.aggregate([
        {
            $match: {
                expiresAt: {
                    $gte: pastDate,
                    $lte: now
                }
            }
        },
        {
            $project: {
                cost: 1,
                quantityArray: {
                    $objectToArray: "$quantity"
                }
            }
        },

        { $unwind: "$quantityArray" },

        {
            $project: {
                store: "$quantityArray.k",
                totalCost: {
                    $multiply: ["$quantityArray.v", "$cost"]
                }
            }
        },
        {
            $group: {
                _id: "$store",
                total: { $sum: "$totalCost" }
            }
        }
    ]);

    return result;
};

export async function getTopExpiredProductsRepository(months) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (months * 30));

    return Product.aggregate([
        {
            $match: {
                expiresAt: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $project: {
                name: 1,
                eanCode: 1,
                totalQuantity: {
                    $reduce: {
                        input: { $objectToArray: "$quantity" },
                        initialValue: 0,
                        in: { $add: ["$$value", "$$this.v"] }
                    }
                }
            }
        },
        {
            $match: { totalQuantity: { $gt: 0 } }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 10 }
    ]);
}