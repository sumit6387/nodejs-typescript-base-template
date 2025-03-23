import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error } from "../handlers"
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return error(res, {
            msg: "Access denied",
            statusCode: 403
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return error(res, {
            msg: "Invalid token",
            statusCode: 401
        })
    }
};
