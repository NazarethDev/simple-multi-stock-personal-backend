// src/app.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import corsOptions from "./config/corsConfig.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Rotas específicas primeiro
app.use("/products", productRoutes);

// Rota de checagem de saúde
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "API online 🚀" });
});

export default app;