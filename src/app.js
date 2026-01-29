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

app.use((req, res, next) => {
    console.log(`[DEBUG] Method: ${req.method} | URL: ${req.url} | Path: ${req.path}`);
    next();
});

// Rota de checagem de saúde
// Rota base para teste direto
app.get("/", (req, res) => {
    res.json({ status: "API online", timestamp: new Date() });
});

export default app;