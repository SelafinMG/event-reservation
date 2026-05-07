import { getAllEventsService, getEventByIdService, createEventService, updateEventService, deleteEventService } from '../services/event.service.js';

export const getAllEventsController = async (req, res) => {
  const events = await getAllEventsService();
  return res.status(200).json(events);
};

export const getEventByIdController = async (req, res) => {
  const { eventId } = req.params;
  const event = await getEventByIdService(eventId);

  if (!event) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Event not found.' });
  }

  return res.status(200).json(event);
};

export const createEventController = async (req, res) => {
  const { title, description, startDate, endDate, location } = req.body;

  if (!title || !startDate || !endDate || !location) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: "Required fields: 'title', 'startDate', 'endDate', 'location'.",
    });
  }

  const event = await createEventService({ title, description, startDate, endDate, location });
  return res.status(201).json(event);
};

export const updateEventController = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, startDate, endDate, location } = req.body;

  const event = await updateEventService(eventId, { title, description, startDate, endDate, location });

  if (!event) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Event not found.' });
  }

  return res.status(200).json(event);
};

export const deleteEventController = async (req, res) => {
  const { eventId } = req.params;
  const deleted = await deleteEventService(eventId);

  if (!deleted) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Event not found.' });
  }

  return res.status(204).send();
};