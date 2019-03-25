"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const User_1 = __importDefault(require("../models/User"));
class Auth {
    constructor() {
        this.users = [];
    }
    static findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield User_1.default.findOne({ email }).exec();
                return userExists;
            }
            catch (e) {
                return e;
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, pass } = req.body;
            const userFinded = yield Auth.findUser(email);
            if (userFinded) {
                try {
                    const compare = yield bcryptjs_1.default.compare(pass, userFinded.password);
                    if (!compare) {
                        res.status(400).json({
                            success: false,
                            message: "username or password incorrect",
                            token: null
                        });
                    }
                    else {
                        const payload = {
                            fname: userFinded.firstName,
                            lname: userFinded.lastName,
                            email: userFinded.email,
                            role: userFinded.role
                        };
                        const token = jsonwebtoken_1.default.sign(payload, keys_1.keys.SECRET_KEY, {
                            expiresIn: "1h"
                        });
                        res.status(200).json({
                            success: true,
                            message: "Logged in",
                            token
                        });
                    }
                }
                catch (e) {
                    res.status(500).json({ message: "internal error", e });
                }
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "the user dosn't exists",
                    token: null
                });
            }
        });
    }
}
exports.default = Auth;
