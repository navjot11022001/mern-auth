import express from "express";
import { getUsers } from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.get("/", getUsers);

export default UserRouter;
