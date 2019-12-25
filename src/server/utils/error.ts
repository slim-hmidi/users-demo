import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.send(statusCode).send({
    message,
  });
  next();
};
