import express, { Router } from "express";

import { loginController } from "../controllers";
import { authenticateController } from "../controllers/auth.controllers";

const authRouter = Router();
authRouter.use(express.json());

authRouter.post("/login", loginController);

authRouter.post("/verify", authenticateController);

export { authRouter };
