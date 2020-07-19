import { NextFunction, Request, Response } from "express";

export class ErrorMiddleware {
  public errorsHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err.message) return res.status(500).json({ message: err.message })
    return res.status(500).json({ message: "Unknown error" })
  }
}