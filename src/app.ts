import express from "express";
import mongoose from "mongoose";

import compression from "compression";
import cors from "cors";
import { errors } from "celebrate"

import dotenv from "dotenv";
dotenv.config()

import config from "./config"

import { UserRoutes } from "./routes/user";
import { ProductRoutes } from "./routes/product";
import { CartRoutes } from "./routes/cart";

class Server {
  public app: express.Application;
  private PORT: string;
  private MONGODB_URI: string;

  constructor() {
    this.PORT = config.PORT;
    this.MONGODB_URI = config.MONGODB_URI;
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
    this.app.use(errors())
  }

  public routes(): void {
    this.app.use("/api/user", new UserRoutes().router);
    this.app.use("/api/products", new ProductRoutes().router);
    this.app.use("/api/cart", new CartRoutes().router);
  }

  public config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
  }

  private mongo() {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo Connection Established");
    });

    connection.on("reconnected", () => {
      console.log("Mongo Connection Reestablished");
    });

    connection.on("disconnected", () => {
      console.log("Mongo Connection Disconnected");
      console.log("Trying to reconnect to Mongo ...");
      setTimeout(() => {
        mongoose.connect(this.MONGODB_URI, {
          autoReconnect: true, keepAlive: true,
          socketTimeoutMS: 3000, connectTimeoutMS: 3000
        });
      }, 3000);
    });

    connection.on("close", () => {
      console.log("Mongo Connection Closed");
    });

    connection.on("error", (error: Error) => {
      console.error(`Mongo Connection ERROR: ${error}`);
    });

    const run = async () => {
      await mongoose.connect(this.MONGODB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    };
    run().catch(error => console.error(error));
  }


  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`app is running on port ${this.PORT}`);
    });
  }

}

const server = new Server();

server.start();