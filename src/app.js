// src/app.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import corsOptions from "./config/corsConfig.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[DEBUG] Method: ${req.method} | URL: ${req.url} | Path: ${req.path}`);
    next();
});

// Rotas específicas primeiro
app.use("/products", productRoutes);

// Rota de checagem de saúde
// Rota base para teste direto
app.get("/", (req, res) => {
    res.json({ status: "API online", timestamp: new Date() });
});

// 4º: Middleware para capturar o que NINGUÉM tratou
app.use((req, res) => {
    console.log(`[404 FINAL] O Express não encontrou nada para: ${req.path}`);
    res.status(404).json({ error: `Rota ${req.path} não encontrada.` });
});

export default app;