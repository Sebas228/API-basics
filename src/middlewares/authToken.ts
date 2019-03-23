import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { keys } from "../config/keys";

function authToken(req: Request, res: Response, next: NextFunction) {
  if (req.path != "/api/auth") {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, keys.SECRET_KEY, function(err, decode) {
        if (err) {
          if (err.message === "invalid token") {
            return res
              .status(403)
              .json({ message: "You don't have permissions to allow access" });
          } else if (err.message === "jwt expired") {
            return res
              .status(403)
              .json({ message: "Your session has expired, Login again" });
          }
        }

        next();
      });
    } else {
      res
        .status(403)
        .json({ message: "You don't have permissions to allow access" });
    }
  } else next();
}

export default authToken;
