import { getAllSpeakersService, getSpeakerByIdService, createSpeakerService, updateSpeakerService, deleteSpeakerService } from '../services/speaker.service.js';

export const getAllSpeakersController = async (req, res) => {
  const speakers = await getAllSpeakersService();
  return res.status(200).json(speakers);
};

export const getSpeakerByIdController = async (req, res) => {
  const speaker = await getSpeakerByIdService(req.params.speakerId);
  if (!speaker) return res.status(404).json({ code: 'NOT_FOUND', message: 'Speaker not found.' });
  return res.status(200).json(speaker);
};

export const createSpeakerController = async (req, res) => {
  const { fullName } = req.body;
  if (!fullName) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: "Field 'fullName' is required." });
  }
  const speaker = await createSpeakerService(req.body);
  return res.status(201).json(speaker);
};

export const updateSpeakerController = async (req, res) => {
  const speaker = await updateSpeakerService(req.params.speakerId, req.body);
  if (!speaker) return res.status(404).json({ code: 'NOT_FOUND', message: 'Speaker not found.' });
  return res.status(200).json(speaker);
};

export const deleteSpeakerController = async (req, res) => {
  const deleted = await deleteSpeakerService(req.params.speakerId);
  if (!deleted) return res.status(404).json({ code: 'NOT_FOUND', message: 'Speaker not found.' });
  return res.status(204).send();
};