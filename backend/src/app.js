import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    mongoose.connect(
      'mongodb+srv://admin-master:admin-master@prova-globo.32ly2.mongodb.net/prova-globo?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
