import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user";
import { connectDB } from "./helpers/db";
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
