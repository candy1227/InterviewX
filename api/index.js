import app from "../backend/src/server.js";
import { connectDB } from "../backend/src/lib/db.js";

let isConnected = false;

export default async function handler(req, res) {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    return app(req, res);
}
