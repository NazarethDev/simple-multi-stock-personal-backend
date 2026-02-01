import { Router } from "express";
import { createProduct, updateProductQuantity, getExpireSoonProducts, findByProductEanCode, updateNameOrProductCostController, findExpiredProducts } from "../controllers/productController.js";
import { getExpiredProductsByStoreController, getExpiredCostStatisticsController } from "../controllers/productStatistics.Controller.js";
import semDescanso from "../controllers/performerController.js";

const router = Router();

router.post("/", createProduct);

router.put("/quantity/:productId", updateProductQuantity);

router.patch("/update-cost-and-name/:id", updateNameOrProductCostController);

router.get("/expiring-soon", getExpireSoonProducts);

router.get("/ean/:eanCode", findByProductEanCode);

router.get("/expired-products", findExpiredProducts);

router.get("/statistics/expired-products-by-store", getExpiredProductsByStoreController);

router.get("/statistics/expired-products-costs-by-store", getExpiredCostStatisticsController);

router.route("/semDescanso").get(semDescanso).head(semDescanso)


export default router;