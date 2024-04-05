import { Router } from "express";
import { signUp, signIn, googleSignIn } from "../controllers/auth.controllers";

const AuthRouter = Router();

AuthRouter.post("/signup", signUp);

AuthRouter.post("/signin", signIn);

AuthRouter.post("/googleSignIn", googleSignIn);

export default AuthRouter; // export
