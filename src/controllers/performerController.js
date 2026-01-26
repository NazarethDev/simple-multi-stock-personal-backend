import { StatusCodes } from "http-status-codes";

export default async function semDescanso(req, res) {
    if (req.method === "HEAD") {
        return res.sendStatus(StatusCodes.OK);
    }

    return res.status(StatusCodes.OK).send("ok");
}
