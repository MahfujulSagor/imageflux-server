import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', uploadRoutes);
app.use('/api', deleteRoutes);

// Default Vercel handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
