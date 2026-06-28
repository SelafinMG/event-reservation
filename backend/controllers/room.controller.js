import { getRoomsByEventService, getAllRoomsService, getRoomByIdService, createRoomService, updateRoomService, deleteRoomService } from '../services/room.service.js';

export const getRoomsByEventController = async (req, res) => {
  const { eventId } = req.params;
  const rooms = await getRoomsByEventService(eventId);
  return res.status(200).json(rooms);
};

export const getAllRoomsController = async (req, res) => {
  const rooms = await getAllRoomsService();
  return res.status(200).json(rooms);
};

export const getRoomByIdController = async (req, res) => {
  const room = await getRoomByIdService(req.params.roomId);

  if (!room) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Room not found.' });
  }

  return res.status(200).json(room);
};

export const createRoomController = async (req, res) => {
  const eventId = req.params.eventId ?? req.body.eventId;
  const { name } = req.body;

  if (!eventId || !name) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: "Fields 'eventId' and 'name' are required.",
    });
  }

  const room = await createRoomService(eventId, name);
  return res.status(201).json({ ...room, eventId });
};

export const updateRoomController = async (req, res) => {
  const { roomId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: "Field 'name' is required.",
    });
  }

  const room = await updateRoomService(roomId, name);

  if (!room) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Room not found.' });
  }

  return res.status(200).json(room);
};

export const deleteRoomController = async (req, res) => {
  const { roomId } = req.params;
  const deleted = await deleteRoomService(roomId);

  if (!deleted) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Room not found.' });
  }

  return res.status(204).send();
};