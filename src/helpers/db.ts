import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/user.modal";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    models: [User], // Path to models
});

export default sequelize;
