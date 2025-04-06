import { Request, RequestHandler, Response } from "express";
import { User } from "../../models";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { success, error } from "../../handlers";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const register: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return error(res, { msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        return success(res, { msg: "User registered", data: user });
    } catch (err) {
        console.log(err);
        return error(res, {
            msg: "Something went wrong",
        });
    }
};

export const loginUser: RequestHandler = async (req, res): Promise<any> => {
    try {
        const {
            email,
            password,
        }: { email: string; password: string } = req.body;

        const user: User | null = await User.findOne({ where: { email } });
        if (!user) {
            return error(res, { msg: "Invalid credentials!!" });
        }
        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            return error(res, { msg: "Invalid credentials!!" });
        }
        const data = {
            user: {
                id: user.id,
            },
        };

        console.log(data);
        const token = jwt.sign(data, JWT_SECRET);

        return success(res, {
            msg: "User logged in successfully!!",
            data: {
                token,
                user
            }
        })
    } catch (err) {
        console.log(err);
        return error(res, {
            msg: "Something went wrong",
        });
    }
};
