"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/:id", UserController_1.default.getUser);
        this.router.get("/", UserController_1.default.getUsers);
        this.router.post("/", UserController_1.default.createUser);
        this.router.put("/:id", UserController_1.default.updateUser);
        this.router.delete("/:id", UserController_1.default.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
