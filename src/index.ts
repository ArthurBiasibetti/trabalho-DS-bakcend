import app from './app';
import { AppDataSource } from './config/database/data-source';

const port = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`API Listening: http://localhost:${port}`);
    });
  })
  .catch((error: Error) => console.log(error));
