import { Router } from "express";
import { bugController } from "../controllers/bugController";
import {
  validateBugBody,
  validateBugId
} from "../validations/bugValidation";

export const bugRoutes = Router();

bugRoutes.get("/", bugController.getAll);

bugRoutes.post("/", validateBugBody, bugController.add);

bugRoutes.delete("/:id", validateBugId, bugController.remove);