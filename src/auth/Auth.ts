import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

const JWT_SECRET: string = "Secret_Password";

class Auth {
  public users: any[] = [];

  constructor() {}

  public static async login(req: Request, res: Response) {
    const { email, pass } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists !== null) {
      if (pass) {
        if (!bcrypt.compare(req.body.pass, userExists.password)) {
          res.status(400).send({ message: "Invalid username or password" });
        } else {
          const tokenData = {
            user: userExists,
            date: new Date()
          };

          const token = jwt.sign(tokenData, JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.status(200).json({
            token: token
          });
        }
      } else {
        res.status(400).json({ message: "the password cannot be empty" });
      }
    }
  }
}

export default Auth;
