import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();
const app = express();

const uri = process.env.MONGOURL
const PORT = process.env.PORT || 4000;

mongoose.connect(uri, {
    useNewUrlParser: true,  // Ensure correct parsing of connection string
    useUnifiedTopology: true,  // Use the new topology engine (recommended)
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(error => console.error('Connection error', error));

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});