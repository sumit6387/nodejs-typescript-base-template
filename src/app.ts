import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user";
import { dbInit } from "./models";
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

dbInit()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("DB connection error:", err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
