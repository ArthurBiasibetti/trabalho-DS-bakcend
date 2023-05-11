import app from './app';
import { AppDataSource } from './config/database/data-source';
import { Manager } from './entity/Manager';

const port = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`API Listening: http://localhost:${port}`);
      AppDataSource.manager.find(Manager);
    });
  })
  .catch((error: Error) => console.log(error));
