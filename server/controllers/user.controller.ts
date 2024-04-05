import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

const getUsers = (req: Request, res: Response) => {
  res.json({ message: "api is working fine" });
};

export { getUsers };
