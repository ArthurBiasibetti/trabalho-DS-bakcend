import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
import cors from 'cors';

import dotenv from 'dotenv';

import { RegisterRoutes } from '../dist/routes';
import { NotFoundError, errorHandler } from './Errors';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../dist/swagger.json')));
});

RegisterRoutes(app);

app.use((req: ExRequest, res: ExResponse, next: NextFunction) => {
  const error = new NotFoundError(`🔍 - Route Not Found - ${req.originalUrl}`);
  next(error);
});

app.use(errorHandler);

export default app;
