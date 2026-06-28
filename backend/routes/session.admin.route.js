import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getSessionsByEventController, getAllSessionsController, createSessionController, createSessionFlatController, getSessionByIdController, updateSessionController, deleteSessionController } from '../controllers/session.admin.controller.js';

export const sessionsByEventRouter = Router({ mergeParams: true });
sessionsByEventRouter.get('/', getSessionsByEventController);
sessionsByEventRouter.post('/', requireAuth, createSessionController);

export const sessionsRouter = Router();
sessionsRouter.get('/', getAllSessionsController);
sessionsRouter.post('/', requireAuth, createSessionFlatController);
sessionsRouter.get('/:sessionId', getSessionByIdController);
sessionsRouter.put('/:sessionId', requireAuth, updateSessionController);
sessionsRouter.delete('/:sessionId', requireAuth, deleteSessionController);