import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";

// ---- Route imports (edit only under your own name) ----

// KYRA
import { bugRoutes } from "./routes/bugRoutes.js";

// MICHAEL
import collectedBugRoutes from './collectedBug/collectedBugRoutes.js';

// ZACH

const app = express();

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  throw new Error("FRONTEND_URL is required");
}

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

// ---- Route mounting (edit only under your own name) ----

// KYRA
app.use("/api/bugs", bugRoutes);

// MICHAEL
app.use('/api/collected-bugs', collectedBugRoutes);

// ZACH

// Central error handler
app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);
  res.status(500).json({ error: "Unexpected server error" });
});

export default app;