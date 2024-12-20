import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import http from 'http';
import connectDB from "./src/utils/db.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();
const app = express();

const uri = process.env.MONGOURL
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});