import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getAllSpeakersController, getSpeakerByIdController,  createSpeakerController, updateSpeakerController, deleteSpeakerController } from '../controllers/speaker.controller.js';

const router = Router();

router.get('/', getAllSpeakersController);
router.get('/:speakerId', getSpeakerByIdController);
router.post('/', requireAuth, createSpeakerController);
router.put('/:speakerId', requireAuth, updateSpeakerController);
router.delete('/:speakerId', requireAuth, deleteSpeakerController);

export default router;