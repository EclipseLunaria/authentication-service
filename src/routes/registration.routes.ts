import express, { Request, Response, Router } from "express";
import { registerUserDirectly } from "../controllers";
import { registerMALUser } from "../controllers/registration.controllers";

const registrationRouter = Router();
registrationRouter.use(express.json());
registrationRouter.get("/", (req: Request, res: Response) => {
  res.send("Registration route is up and running");
});

registrationRouter.post("/", registerUserDirectly);
registrationRouter.post("/mal", registerMALUser);

export default registrationRouter;
