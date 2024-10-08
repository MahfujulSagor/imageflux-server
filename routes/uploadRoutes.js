import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer();

router.post('/upload', authenticate, upload.single('file'), uploadFile);

export default router;
