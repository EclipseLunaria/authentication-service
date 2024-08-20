import express, { Router } from "express";

import { loginController } from "../controllers";
import {
  authenticateController,
  refreshTokenController,
} from "../controllers/auth.controllers";

const authRouter = Router();
authRouter.use(express.json());

authRouter.post("/login", loginController);

authRouter.post("/verify", authenticateController);

authRouter.post("/refresh", refreshTokenController);

authRouter.get("/mal",) 
export { authRouter };
