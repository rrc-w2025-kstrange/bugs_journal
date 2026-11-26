import type { Request, Response } from "express";
import type { CreateBugInput } from "../types/bug";
import { bugService } from "../services/bugService";

export const bugController = {
  async getAll(_req: Request, res: Response) {
    const bugs = await bugService.getAll();
    res.json(bugs);
  },

  async add(req: Request, res: Response) {
    const bug = await bugService.add(req.body as CreateBugInput);
    res.status(201).json(bug);
  },

  async remove(req: Request, res: Response) {
    const removed = await bugService.remove(Number(req.params.id));

    if (!removed) {
      res.status(404).json({ error: "Bug not found" });
      return;
    }

    res.sendStatus(204);
  }
};