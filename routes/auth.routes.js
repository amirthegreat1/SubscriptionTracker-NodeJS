import Router from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

// Define authentication routes
const authRouter = Router();
//PATH: /api/v1/auth/sign-up (POST)
authRouter.post("/sign-up", signUp);
//PATH: /api/v1/auth/sign-in (POST)
authRouter.post("/sign-in", signIn);
//PATH: /api/v1/auth/sign-out (POST)
authRouter.post("/sign-out", signOut);
export default authRouter;
