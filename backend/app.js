import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoute from './routes/session.route.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/sessions", sessionRoute);


export default app;