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
const User_1 = __importDefault(require("../models/User"));
/* Class for manage all HTTP Request for Model user */
class UserController {
    constructor() { }
    /*
     * Method to get One user from DB
     * This methos is static and use async/await for asynchronus Request
     *
     * @param _id The unique id for each user in DB
     * @return Promise with Http Response
     */
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFinded = yield User_1.default.findOne({ _id: req.params.id });
            if (!userFinded) {
                res.status(400).json({ message: "the user dosn't exists" });
            }
            else {
                res.status(200).json(userFinded);
            }
        });
    }
    /*
     * Method to get all users from DB
     * This methos is static and use async/await for asynchronus Request
     *
     * @return Promise with Http Response
     */
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find();
            res.status(200).json(users);
        });
    }
    /*
     * Method to create a new user from DB
     * This methos is static and use async/await for asynchronus Request
     *
     * @param firstName, lastName, paswword, email and image(can be null),
     *  This fields is required, and can be null with exception of image
     *
     * the password is encrypted and send to DB
     *
     * @return Promise with Http Response
     */
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default(req.body);
            try {
                const user = yield newUser.save();
                res.status(200).json(user);
            }
            catch (e) {
                res.status(400).json({ message: "The email already exists", e });
            }
        });
    }
    /*
     * Method to update an user from DB
     * This methos is static and use async/await for asynchronus Request
     *
     * @param _id
     *  The id of user to update, this _id is unique for each user
     *
     * @param req.body
     *  the fields to update
     *
     * @return Promise with Http Response
     */
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield User_1.default.findById(id);
            if (!user) {
                res.status(400).json({
                    message: "the user dosn't exists"
                });
            }
            else {
                try {
                    const userUpdated = yield User_1.default.findOneAndUpdate({ _id: id }, req.body, {
                        new: true
                    });
                    res.status(201).json({
                        message: "The user has been updated",
                        userUpdated
                    });
                }
                catch (e) {
                    res
                        .status(500)
                        .json({ message: "an internal error has been ocurred", e });
                }
            }
        });
    }
    /*
     * Method to delet and user from DB
     * This methos is static and use async/await for asynchronus Request
     *
     * @param _id
     *  The id of user to delet, this _id is unique for each user
     *
     * @return Promise with Http Response
     */
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield User_1.default.findOneAndDelete({ _id: id });
                res.status(200).json({
                    message: "The user has been deleted"
                });
            }
            catch (e) {
                res.status(500).json({ message: "an internal error has been ocurred" });
            }
        });
    }
}
exports.default = UserController;
