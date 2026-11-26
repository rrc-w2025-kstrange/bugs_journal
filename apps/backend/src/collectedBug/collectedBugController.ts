import { Request, Response } from 'express';
import { collectedBugService } from './collectedBugService.js';

export const collectedBugController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const bugs = await collectedBugService.getBugs();
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bugs' });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const newBug = await collectedBugService.addBug(req.body);
      res.status(201).json(newBug);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add bug' });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await collectedBugService.removeBug(id);

      // If Prisma does not find the bug, it throws an error, but just in case:
      if (!deleted) {
        return res.status(404).json({ error: 'Bug not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete bug' });
    }
  } 
};