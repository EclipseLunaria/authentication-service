import express, { Router } from "express";
import registrationRouter from "./registration.routes";

const router = Router();
router.use("/registration", registrationRouter);

export default router;
