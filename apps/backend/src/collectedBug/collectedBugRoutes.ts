import { Router } from "express";
import { collectedBugController } from "./collectedBugController.js";
import { validateCollectedBugBody, validateCollectedBugId } from "../validations/collectedBugValidation.js";

const router = Router();

// GET all collected bugs
router.get("/", collectedBugController.getAll);

// POST a new collected bug (This is what was missing/breaking!)
router.post("/", validateCollectedBugBody, collectedBugController.create);

// DELETE a collected bug by ID
router.delete("/:id", validateCollectedBugId, collectedBugController.delete);

export default router;