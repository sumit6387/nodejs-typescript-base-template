import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Validate } from "./validate";

export const registerValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    await Validate(req, res, next, schema);
};

export const loginValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    await Validate(req, res, next, schema);
};