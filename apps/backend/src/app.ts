import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";

// ---- Route imports (edit only under your own name) ----

// KYRA

// MICHAEL

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

// MICHAEL

// ZACH

// Central error handler: catches any error thrown inside a route
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