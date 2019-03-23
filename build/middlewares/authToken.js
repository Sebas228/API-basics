"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
function authToken(req, res, next) {
    if (req.path != "/api/auth") {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            jsonwebtoken_1.default.verify(token, keys_1.keys.SECRET_KEY, function (err, decode) {
                if (err) {
                    if (err.message === "invalid token") {
                        return res
                            .status(403)
                            .json({ message: "You don't have permissions to allow access" });
                    }
                    else if (err.message === "jwt expired") {
                        return res
                            .status(403)
                            .json({ message: "Your session has expired, Login again" });
                    }
                }
                next();
            });
        }
        else {
            res
                .status(403)
                .json({ message: "You don't have permissions to allow access" });
        }
    }
    else
        next();
}
exports.default = authToken;
