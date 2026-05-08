import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getRoomsByEventController, createRoomController, updateRoomController, deleteRoomController } from '../controllers/room.controller.js';

export const roomsByEventRouter = Router({ mergeParams: true });
roomsByEventRouter.get('/', getRoomsByEventController);
roomsByEventRouter.post('/', requireAuth, createRoomController);

export const roomsRouter = Router();
roomsRouter.put('/:roomId', requireAuth, updateRoomController);
roomsRouter.delete('/:roomId', requireAuth, deleteRoomController);