import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import corsOptions from "./config/corsConfig.js";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

connectDB();

app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json(({status: "API online 🚀"}))
})

export default app;