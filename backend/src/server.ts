import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import { errorHandler } from "./middlewares/error.middleware";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import bidRoutes from "./routes/bid.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();
const PORT = process.env.PORT ?? 5050;

const isDev = (process.env.NODE_ENV ?? "development") !== "production";

const corsOrigins = (
  process.env.CORS_ORIGINS ??
  "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,http://localhost:5176,http://127.0.0.1:5176,http://localhost:5177,http://127.0.0.1:5177"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (isDev) return cb(null, true);
      if (corsOrigins.includes("*") || corsOrigins.includes(origin))
        return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  const states: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  res.status(200).json({
    success: true,
    data: {
      db: states[mongoose.connection.readyState] ?? "unknown",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/admin", adminRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
