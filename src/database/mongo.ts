import mongoose from "mongoose";
import config from "config";
import pino from "pino";
const logger = pino();

/**
 * class for handling MongoDB connection
 */
class Mongo {
  uri: string = config.get('mongodb.uri');

  constructor() {
    this.connect();
  }

  connect() {
    // connect to Mongoose server
    mongoose.connect(this.uri).then(
      () => logger.info("connected to MongoDB"),
      () => "MongoDB connection failed"
    );
  }
}

new Mongo().connect();