import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,

  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  if ((err as any).code === 11000) {
    res.status(409).json({ success: false, message: "Duplicate field value" });
    return;
  }

  console.error("Unhandled error:", err);
  const isDev = (process.env.NODE_ENV ?? "development") !== "production";
  res.status(500).json({
    success: false,
    message: isDev ? err.message : "Internal server error",
    ...(isDev ? { stack: err.stack } : {}),
  });
};
