import { Response } from "express";

interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}

export interface SuccessResponse {
    success?: boolean;
    msg?: string;
    data?: any;
    pagination?: Pagination;
}

export interface ErrorResponse {
    status?: boolean;
    msg?: string;
    error?: any;
    statusCode?: number;
}

export const success = (res: Response, response: SuccessResponse) => {
    response.data = response.data ?? [];
    response["success"] = response.success ?? true;
    return res.status(200).json(response);
};

export const error = (res: Response, error: ErrorResponse) => {
    const statusCode = error.statusCode ?? 400;
    const err = error.error ?? [];
    const formattedError = { success: false, msg: error.msg, error: err };
    return res.status(statusCode).json(formattedError);
};
