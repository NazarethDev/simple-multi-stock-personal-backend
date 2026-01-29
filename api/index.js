import app from "../src/app.js";
import { connectDB } from "../src/config/database.js";

export default async (req, res) => {
    // Garante a conexão antes de processar a rota do Express
    await connectDB();
    return app(req, res);
};