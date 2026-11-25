import { Router } from 'express';
import { collectedBugController } from './collectedBugController.js';

const router = Router();

router.get('/', collectedBugController.getAll);
router.post('/', collectedBugController.create);
router.delete('/:id', collectedBugController.delete);

export default router;