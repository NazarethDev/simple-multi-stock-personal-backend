import { StatusCodes } from "http-status-codes";
import app from "../src/app.js";
import { connectDB } from "../src/config/database.js"


let isConnected = false;


export default async function handler(req, res) {
    try {
        if (!isConnected) {
            await connectDB();
            isConnected = true;
        }

        return app(req, res);
    } catch (error) {
        console.error("Handler error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" })
    }

}