import { Request, Response, NextFunction } from "express";

const asyncHandler = (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err: any) => {  // You can improve this type if necessary
                const statusCode = err?.statusCode || 500;
                const message = err?.message || "Something went wrong";

                // Send the error response
                res.status(statusCode).json({
                    success: false,
                    message: message
                });
            });
    };
};

export { asyncHandler };
