// api/index.js
import app from "../src/app.js";
import { connectDB } from "../src/config/database.js";

export default async function handler(req, res) {
    try {
        await connectDB();
        // O Express vai lidar com o resto
        return app(req, res);
    } catch (error) {
        console.error("Erro na execução do Handler:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}