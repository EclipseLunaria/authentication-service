import { Request, Response } from "express";
import { handleRegistration } from "../services/registration.services";
import { IRegistrationForm } from "../interfaces";
const registerUserDirectly = async (req: Request, res: Response) => {
  console.log(req.body);
  const body: IRegistrationForm = req.body;
  try {
    await handleRegistration(body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(body);
};

export { registerUserDirectly };
