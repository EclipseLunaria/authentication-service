import express, { Request, Response, Router } from "express";
import { registerUserDirectly } from "../controllers";

const registrationRouter = Router();
registrationRouter.use(express.json());
registrationRouter.get("/", (req: Request, res: Response) => {
  res.send("Registration route is up and running");
});

registrationRouter.post("/", registerUserDirectly);

export default registrationRouter;
