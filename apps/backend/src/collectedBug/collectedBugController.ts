import { Request, Response } from 'express';
import { collectedBugService } from './collectedBugService.js';

export const collectedBugController = {
  getAll: async (_req: Request, res: Response) => {
    const bugs = await collectedBugService.getAll();
    res.json(bugs);
  },

  create: async (req: Request, res: Response) => {
    const newBug = await collectedBugService.add(req.body);
    res.status(201).json(newBug);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await collectedBugService.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.status(204).send();
  }
};