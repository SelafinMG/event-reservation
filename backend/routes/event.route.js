import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getAllEventsController, getEventByIdController, createEventController, updateEventController, deleteEventController } from '../controllers/event.controller.js';

const router = Router();

router.get('/', getAllEventsController);
router.get('/:eventId', getEventByIdController);
router.post('/', requireAuth, createEventController);
router.put('/:eventId', requireAuth, updateEventController);
router.delete('/:eventId', requireAuth, deleteEventController);

export default router;