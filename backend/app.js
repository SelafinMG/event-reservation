import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoute from './routes/session.route.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/v1/sessions', sessionRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: 'SERVER_ERROR', message: 'Internal server error.' });
});

export default app;