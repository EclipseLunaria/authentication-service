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
    res.redirect(`${process.env.CLIENT_BASE_URL}`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const registerMALUser = async (req: Request, res: Response) => {
  const body: IMALRegistration = req.body;
  try {
    const registrationResult = await handleMALRegistration(body);
    res.status(200).json(registrationResult);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export { registerUserDirectly, registerMALUser };
