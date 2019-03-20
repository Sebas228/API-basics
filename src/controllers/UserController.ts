import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";

/* Class for manage all HTTP Request for Model user */
class UserController {
  constructor() {}

  /*
   * Method to get One user from DB
   * This methos is static and use async/await for asynchronus Request
   *
   * @param _id The unique id for each user in DB
   * @return Promise with Http Response
   */
  public static async getUser(req: Request, res: Response): Promise<void> {
    const userFinded = await User.findOne({ _id: req.params.id });

    if (!userFinded) {
      res.status(400).json({ message: "the user dosn't exists" });
    } else {
      res.status(200).json(userFinded);
    }
  }

  /*
   * Method to get all users from DB
   * This methos is static and use async/await for asynchronus Request
   *
   * @return Promise with Http Response
   */
  public static async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();
    res.status(200).json(users);
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
  public static async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, password, email, image } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const passHashed = hash;

    const newUser = new User({
      firstName,
      lastName,
      password: passHashed,
      email,
      image
    });

    try {
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ message: "The email already exists", e });
    }
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
  public static async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({
        message: "the user dosn't exists"
      });
    } else {
      try {
        /* Encrypt password before send to DB */
        if (req.body.password) {
          const pass = bcrypt.hashSync(req.body.password, 10);
          req.body.password = pass;
        }

        const userUpdated = await User.findByIdAndUpdate(id, req.body);

        res.status(201).json({
          message: "The user has been updated",
          userUpdated
        });
      } catch (e) {
        res
          .status(500)
          .json({ message: "an internal error has been ocurred", e });
      }
    }
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
  public static async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({
        message: "The user has been deleted"
      });
    } catch (e) {
      res.status(500).json({ message: "an internal error has been ocurred" });
    }
  }
}

export default UserController;
