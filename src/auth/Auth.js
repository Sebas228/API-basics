import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { keys } from "../config/keys";

import User from "../models/User";

class Auth {
  users = [];

  constructor() {}

  static async findUser(email) {
    try {
      const userExists = await User.findOne({ email }).exec();
      return userExists;
    } catch (e) {
      return e;
    }
  }

  static async login(req, res) {
    const { email, pass } = req.body;

    const userFinded = await Auth.findUser(email);

    if (userFinded) {
      try {
        const compare = await bcrypt.compare(pass, userFinded.password);

        if (!compare) {
          res.status(400).json({
            success: false,
            message: "username or password incorrect",
            token: null
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
            message: "Logged in",
            token
          });
        }
      } catch (e) {
        res.status(500).json({ message: "internal error", e });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "the user dosn't exists",
        token: null
      });
    }
  }
}

export default Auth;
