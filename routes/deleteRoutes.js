import express from 'express';
import { deleteFile } from '../controllers/deleteController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/delete', authenticate, deleteFile);

export default router;
