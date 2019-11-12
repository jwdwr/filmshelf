import express from 'express';
import pino from 'express-pino-logger';

import filmRouter from "./routes/film";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(pino());
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use("/film", filmRouter);
  }
}

export default new App().express;
