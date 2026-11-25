import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";

// ---- Route imports (edit only under your own name) ----

// KYRA

// MICHAEL

// ZACH

const app = express();

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