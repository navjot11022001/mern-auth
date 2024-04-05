import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import * as authServices from "../services/auth.services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface ISignUpBody {
  name: string;
  email: string;
  password: string;
}
const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required", status: 400 });
    }
    const user: ISignUpBody = { name, email, password };
    const response = await User.create(user);
    if (!response) {
      res.status(400).json({ message: "User Already exist", status: 400 });
    }
    res.status(201).json({ message: "user created succcessfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

interface ISignInBody {
  email: string;
  password: string;
}
const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ISignInBody;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: 400 });
    }
    const user = (await User.findOne({ email }).select("+password")) as any;
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
    const validPassword = bcrypt.compareSync(password, user?.password || "");
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: 401 });
    }
    const token = jwt.sign(
      { id: user?._id },
      process.env.JWT_SECRET || "secret"
    );
    const { password: userPassword, ...userDetails } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 36000000),
        sameSite: "lax",
      })
      .status(200)
      .json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { email, name, photo } = req.body || {};
    if (!email) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: 400 });
    }
    let user = (await User.findOne({ email }).select("+password")) as any;

    let isNewUsercreated = false;

    if (!user) {
      user = await authServices.createUser({
        email,
        name,
        profilePhoto: photo,
      });
      isNewUsercreated = true;
    }

    const token = jwt.sign(
      { id: user?._id },
      process.env.JWT_SECRET || "secret"
    );
    const { password, ...rest } = user?._doc;
    const expiryDate = new Date(Date.now() + 36000000);
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: expiryDate,
        sameSite: "lax",
      })
      .status(200)
      .json({ ...rest, newUser: isNewUsercreated });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export { signUp, signIn, googleSignIn };
