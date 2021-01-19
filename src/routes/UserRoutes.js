import { Router } from "express";

import UserController from "../controllers/UserController";

class UserRoutes {

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/:id", UserController.getUser);
    this.router.get("/", UserController.getUsers);
    this.router.post("/", UserController.createUser);
    this.router.put("/:id", UserController.updateUser);
    this.router.delete("/:id", UserController.deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
