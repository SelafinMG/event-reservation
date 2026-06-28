// controllers/session.admin.controller.js
import { getSessionsByEventService, getAllSessionsService, getSessionByIdService, createSessionService, updateSessionService, deleteSessionService } from '../services/session.admin.service.js';

export const getSessionsByEventController = async (req, res) => {
  const sessions = await getSessionsByEventService(req.params.eventId, req.query);
  if (!sessions) return res.status(404).json({ code: 'NOT_FOUND', message: 'Event not found.' });
  return res.status(200).json(sessions);
};

export const getAllSessionsController = async (req, res) => {
  const sessions = await getAllSessionsService();
  return res.status(200).json(sessions);
};

export const createSessionFlatController = async (req, res) => {
  const { eventId, title, startTime, endTime, roomId } = req.body;
  if (!eventId || !title || !startTime || !endTime || !roomId) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Required fields: eventId, title, startTime, endTime, roomId.' });
  }
  const session = await createSessionService(eventId, req.body);
  return res.status(201).json(session);
};

export const getSessionByIdController = async (req, res) => {
  const session = await getSessionByIdService(req.params.sessionId);
  if (!session) return res.status(404).json({ code: 'NOT_FOUND', message: 'Session not found.' });
  return res.status(200).json(session);
};

export const createSessionController = async (req, res) => {
  const { title, startTime, endTime, roomId } = req.body;
  if (!title || !startTime || !endTime || !roomId) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Required fields: title, startTime, endTime, roomId.' });
  }
  const session = await createSessionService(req.params.eventId, req.body);
  return res.status(201).json(session);
};

export const updateSessionController = async (req, res) => {
  const session = await updateSessionService(req.params.sessionId, req.body);
  if (!session) return res.status(404).json({ code: 'NOT_FOUND', message: 'Session not found.' });
  return res.status(200).json(session);
};

export const deleteSessionController = async (req, res) => {
  const deleted = await deleteSessionService(req.params.sessionId);
  if (!deleted) return res.status(404).json({ code: 'NOT_FOUND', message: 'Session not found.' });
  return res.status(204).send();
};