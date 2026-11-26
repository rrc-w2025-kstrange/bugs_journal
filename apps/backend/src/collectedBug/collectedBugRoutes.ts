import { Router } from "express";
import { collectedBugController } from "./collectedBugController.js";
import { validateCollectedBugBody, validateCollectedBugId } from "../validations/collectedBugValidation.js";

const router = Router();

router.get("/", collectedBugController.getAll);
router.post("/", validateCollectedBugBody, collectedBugController.create);
router.delete("/:id", validateCollectedBugId, collectedBugController.delete);

export default router;