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
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = "Secret_Password";
class Auth {
    constructor() {
        this.users = [];
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, pass } = req.body;
            const userExists = yield User_1.default.findOne({ email });
            if (userExists !== null) {
                if (pass) {
                    if (!bcryptjs_1.default.compare(req.body.pass, userExists.password)) {
                        res.status(400).send({ message: "Invalid username or password" });
                    }
                    else {
                        const tokenData = {
                            user: userExists,
                            date: new Date()
                        };
                        const token = jsonwebtoken_1.default.sign(tokenData, JWT_SECRET, {
                            expiresIn: 60 * 60 * 24
                        });
                        res.status(200).json({
                            token: token
                        });
                    }
                }
                else {
                    res.status(400).json({ message: "the password cannot be empty" });
                }
            }
        });
    }
}
exports.default = Auth;
