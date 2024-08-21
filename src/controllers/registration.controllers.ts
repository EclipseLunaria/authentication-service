import { Request, Response } from "express";
import {
  handleMALRegistration,
  handleRegistration,
} from "../services/registration.services";
import { IRegistrationForm } from "../interfaces";
import IMALRegistration from "../interfaces/mal.registration";
const registerUserDirectly = async (req: Request, res: Response) => {
  const body: IRegistrationForm = req.body;
  try {
    await handleRegistration(body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(body);
};

const registerMALUser = async (req: Request, res: Response) => {
  const body: IMALRegistration = req.body;
  try {
    res.setHeader("Authorization", await handleMALRegistration(body));
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  res.json(body);
};

export { registerUserDirectly, registerMALUser };
