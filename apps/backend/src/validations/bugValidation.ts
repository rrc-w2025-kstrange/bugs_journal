import type { RequestHandler } from "express";
import { z } from "zod";

const bugCategories = [
  "Moths",
  "Ants",
  "Butterflies",
  "Bees",
  "Arachnids",
  "Beetles"
] as const;

// The shape a new bug must have. .strict() rejects unknown extra fields.
const createBugSchema = z.object({
  name: z.string().trim().min(3, "Bug name must be at least 3 characters."),
  scientificName: z.string().trim().optional(),
  category: z.enum(bugCategories)
}).strict();

export const validateBugBody: RequestHandler = (req, res, next) => {
  const result = createBugSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid bug",
      details: z.flattenError(result.error)
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateBugId: RequestHandler = (req, res, next) => {
  const result = z.coerce.number()
    .int()
    .positive()
    .safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({ error: "Invalid bug ID" });
    return;
  }

  next();
};