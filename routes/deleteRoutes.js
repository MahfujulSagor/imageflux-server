import express from 'express';
import { deleteFile } from '../controllers/deleteController.js';

const router = express.Router();

// Route for deleting a file
router.delete('/delete', deleteFile);

export default router;
