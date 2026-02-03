// src/app.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import corsOptions from "./config/corsConfig.js";
import { connectDB } from "./config/database.js"

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

//connectDB();

app.use((req, res, next) => {
    console.log(`[DEBUG] Method: ${req.method} | URL: ${req.url} | Path: ${req.path}`);
    next();
});

app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.json({ status: "API online", timestamp: new Date() });
});

app.use((req, res) => {
    console.log(`[404 FINAL] O Express não encontrou nada para: ${req.path}`);
    res.status(404).json({ error: `Rota ${req.path} não encontrada.` });
});

export default app;