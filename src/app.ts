import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import { connectDB } from './data-source';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.boostrap();
  }

  private async boostrap() {
    const result = dotenv.config();
    if (result.error) {
      throw new Error('dotenv config error');
    }

    this.initialiseDatabaseConnection();
    this.initialiseConfig();
    this.initialiseRoutes();
  }

  private initialiseConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private initialiseRoutes(): void {
    this.app.get('/', async (req: Request, res: Response): Promise<Response> => res.status(200).send({
        message: 'Hello World!',
      }));
  }

  private initialiseDatabaseConnection(): void {
    connectDB();
  }

  public start(): void {
    const port = process.env.PORT || 3000;

    this.app.listen(port, () => {
      console.log('Server listening on port: ' + port);
    });
  }
}

export default App;
