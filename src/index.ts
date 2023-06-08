import app from './app';
import { AppDataSource } from './config/database/data-source';
import { User } from './entity/User';

const port = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
