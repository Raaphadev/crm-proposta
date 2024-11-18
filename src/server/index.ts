import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { dealsRouter } from './routes/deals';
import { errorHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/users', authenticate, usersRouter);
app.use('/api/deals', authenticate, dealsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});