import 'dotenv/config'; // <-- MUST BE LINE 1 TO LOAD ENVIRONMENT VARIABLES BEFORE OTHER FILES
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDatabaseClient } from './config/db';
import { signupController, loginController } from './controllers/auth';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

connectDatabaseClient();

app.post('/api/auth/register', signupController);
app.post('/api/auth/login', loginController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));