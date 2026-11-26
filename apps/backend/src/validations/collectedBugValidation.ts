import type { RequestHandler } from "express";
import { z } from "zod";

const createCollectedBugSchema = z.object({
  userId: z.number().int().positive(),
  bugId: z.number().int().positive()
}).strict();

export const validateCollectedBugBody: RequestHandler = (req, res, next) => {
  const result = createCollectedBugSchema.safeParse(req.body);

  if (!result.success) {
    // Using .issues for Zod v4 compatibility
    console.log("ZOD VALIDATION FAILED:", result.error.issues); 
    
    res.status(400).json({
      error: "Invalid collected bug",
      details: result.error.issues 
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateCollectedBugId: RequestHandler = (req, res, next) => {
  const result = z.coerce.number()
    .int()
    .positive()
    .safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({ error: "Invalid collected bug ID" });
    return;
  }

  next();
};