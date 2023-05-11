import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
import cors from 'cors';

import csv from 'papaparse';
import * as middlewares from './middlewares';
import dotenv from 'dotenv';
import { RegisterRoutes } from '../dist/routes';

dotenv.config();

const app = express();
const file = multer();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../dist/swagger.json')));
});

app.post<string, any>('/file', file.single('file'), (req, res) => {
  let data = null;

  if (req.file) {
    data = csv.parse(req.file.buffer.toString(), { header: true });
  }
  console.log(data);
  return res.status(200).json(data);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
