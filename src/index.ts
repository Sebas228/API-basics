import express, { Application } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

// Database
import "./database";

// load Routes
import userRoutes from "./routes/UserRoutes";
import Auth from "./auth/Auth";

class Server {
  app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.PORT || 3000);

    // Middlewares
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use("*", cors());
  }

  routes() {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/auth", Auth.login);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
