import express, { Router } from "express";
import registrationRouter from "./registration.routes";
import { authRouter } from "./auth.routes";

const router = Router();
router.use("/signup", registrationRouter);
router.use("/auth", authRouter);
export default router;
