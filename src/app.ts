import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
import cors from 'cors';

import csv from 'papaparse';
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();
const file = multer();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.post<{}, any>('/file', file.single('file'), (req, res) => {
  let data = null;

  if (req.file) {
    data = csv.parse(req.file.buffer.toString(), { header: true });
  }
  console.log(data);
  return res.status(200).json(data);
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
