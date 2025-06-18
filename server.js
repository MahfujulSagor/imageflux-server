import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config(); // Load environment variables

const app = express();

app.use(cors({
  methods: ['POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rate limiting middleware
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use("/api", globalLimiter);

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
