import { Request, RequestHandler, Response } from "express";
import { IUser, User } from "../../models";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { success, error } from "../../handlers";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            error(res, { msg: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        success(res, { msg: "User registered", data: user });
        return;
    } catch (err) {
        console.log(err);
        error(res, {
            msg: "Something went wrong",
        });
        return;
    }
};

export const loginUser: RequestHandler = async (req, res): Promise<void> => {
    try {
        const {
            email,
            password,
        }: { email: string; password: string } = req.body;

        const user: IUser | null = await User.findOne({ where: { email } });
        if (!user) {
            error(res, { msg: "Invalid credentials!!" });
            return;
        }
        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            error(res, { msg: "Invalid credentials!!" });
            return;
        }
        const data = {
            user: {
                id: user._id,
            },
        };

        console.log(data);
        const token = jwt.sign(data, JWT_SECRET);
        success(res, {
            msg: "User logged in successfully!!",
            data: {
                token,
                user
            }
        });
        return;
    } catch (err) {
        console.log(err);
        error(res, {
            msg: "Something went wrong",
        });
        return;
    }
};
