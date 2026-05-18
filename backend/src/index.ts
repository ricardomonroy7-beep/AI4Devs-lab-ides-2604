import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidatesRouter from './routes/candidates.routes';
import { errorMiddleware } from './middleware/error.middleware';

dotenv.config();

export const app = express();

const port = 3010;

// CORS: solo permite peticiones desde el frontend en localhost:3000
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
);

// express.json() para rutas que reciban JSON (no aplica a multipart, pero lo dejamos)
app.use(express.json());

// Ruta de salud — conservada del repo base
app.get('/', (_req: Request, res: Response) => {
  res.send('Hola LTI!');
});

// Rutas de candidatos
app.use('/api/candidates', candidatesRouter);

// Error handler global — debe ir DESPUÉS de todas las rutas
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
