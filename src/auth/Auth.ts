import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { keys } from "../config/keys";

import User from "../models/User";

class Auth {
  public users: any[] = [];

  constructor() {}

  private static async findUser(email: string) {
    try {
      const userExists = await User.findOne({ email }).exec();
      return userExists;
    } catch (e) {
      return e;
    }
  }

  public static async login(req: Request, res: Response) {
    const { email, pass } = req.body;

    const userFinded = await Auth.findUser(email);

    if (userFinded) {
      try {
        const compare = await bcrypt.compare(pass, userFinded.password);

        if (!compare) {
          res.status(400).json({
            success: false,
            message: "username or password incorrect"
          });
        } else {
          const payload = {
            fname: userFinded.firstName,
            lname: userFinded.lastName,
            email: userFinded.email,
            role: userFinded.role
          };

          const token = jwt.sign(payload, keys.SECRET_KEY, {
            expiresIn: "1h"
          });

          res.status(200).json({
            success: true,
            token
          });
        }
      } catch (e) {
        res.status(500).json({ message: "internal error", e });
      }
    } else {
      res.status(400).json({ message: "the user dosn't exists" });
    }
  }
}

export default Auth;
