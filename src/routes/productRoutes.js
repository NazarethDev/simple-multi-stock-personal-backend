import { Router } from "express";
import { createProduct, updateProductQuantity, getExpireSoonProducts, findByProductEanCode, updateNameOrProductCostController, findExpiredProducts } from "../controllers/productController.js";
import { getExpiredProductsByStoreController, getExpiredCostStatisticsController, getTopExpiredProductsController } from "../controllers/productStatistics.Controller.js";

const router = Router();

router.post("/", createProduct);

router.put("/quantity/:productId", updateProductQuantity);

router.patch("/update-cost-and-name/:id", updateNameOrProductCostController);

router.get("/expiring-soon", getExpireSoonProducts);

router.get("/ean/:eanCode", findByProductEanCode);

router.get("/expired-products", findExpiredProducts);

router.get("/statistics/expired-products-by-store", getExpiredProductsByStoreController);

router.get("/statistics/expired-products-costs-by-store", getExpiredCostStatisticsController);

router.get("/statistics/top-expired-products", getTopExpiredProductsController);

export default router;