import { StatusCodes } from "http-status-codes";
import { getExpiredProductsByStoreRepository, getExpiredCostByStoreRepository, getTopExpiredProductsRepository } from "../repositories/productStatistcsRepository.js";

export async function expiredProductsByStoreService(months) {
    const parsedMonths = months ? Number(months) : 1;
    const allowedMonths = [1, 2, 3];

    if (!allowedMonths.includes(parsedMonths)) {
        const error = new Error("Invalid search period in months.");
        error.status = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const stats = await getExpiredProductsByStoreRepository(parsedMonths);

    const byStore = {};
    let totalLostedProducts = 0;

    stats.forEach(item => {
        byStore[item._id] = item.totalExpiredProducts;
        totalLostedProducts += item.totalExpiredProducts;
    });

    return {
        totalLosted: totalLostedProducts,
        byStore: byStore
    };
}

export async function getExpiresCostsStatisticsService(months) {
    const parsedMonths = months ? Number(months) : 3

    if (isNaN(parsedMonths) || ![1, 2, 3].includes(parsedMonths)) {
        const error = new Error("Months must be 1, 2 or 3");
        error.status = StatusCodes.BAD_REQUEST;
        throw error;
    };

    const data = await getExpiredCostByStoreRepository(parsedMonths);

    let totalLostedCost = 0;
    const byStore = {};

    data.forEach(item => {
        byStore[item._id] = Number(item.total.toFixed(2));
        totalLostedCost += item.total
    });

    return {
        totalLosted: Number(totalLostedCost.toFixed(2)),
        byStore: byStore
    };
}

export async function getTopExpiredProductsService(months) {
    const parsedMonths = months ? Number(months) : 1;
    const allowedMonths = [1, 2, 3];

    if (!allowedMonths.includes(parsedMonths)) {
        const error = new Error("Invalid search period.");
        error.status = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const topProducts = await getTopExpiredProductsRepository(parsedMonths);

    return topProducts.map(p => ({
        id: p._id,
        name: p.name,
        ean: p.eanCode,
        quantity: p.totalQuantity
    }));
}