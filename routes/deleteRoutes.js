import express from 'express';
import { deleteFile } from '../controllers/deleteController.js';

const router = express.Router();

router.delete('/delete', deleteFile);

export default router;
