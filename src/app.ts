import "dotenv/config";
import express from "express";
import cors from "cors";
import { eventRouter } from "./router.js"

const app = express();


// Middleware 
app.use(express.json());


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Helper routes

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/events", eventRouter);

const PORT = 8000

app.listen(PORT, () => {
    console.log("Server started on port 8000")
})

