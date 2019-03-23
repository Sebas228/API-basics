"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
//Configs
const keys_1 = require("./config/keys");
const authToken_1 = __importDefault(require("./middlewares/authToken"));
// Database
require("./config/database");
// load Routes
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const Auth_1 = __importDefault(require("./auth/Auth"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", keys_1.keys.Port);
        // Middlewares
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(compression_1.default());
        this.app.use(helmet_1.default());
        this.app.use("*", cors_1.default());
        this.app.use(authToken_1.default);
    }
    routes() {
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use("/api/auth", Auth_1.default.login);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port: ", this.app.get("port"));
        });
    }
}
const App = new Server();
App.start();
