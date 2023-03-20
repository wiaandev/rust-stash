import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT;


