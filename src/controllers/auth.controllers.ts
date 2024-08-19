import { Request, Response } from "express";
import { login } from "../utils/login.utils";
import { handleTokenAuthentication } from "../services/auth.services";

const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const authenticateController = async (req: Request, res: Response) => {
  try {
    console.log(req.headers);
    const decoded = await handleTokenAuthentication(req.headers.authorization);
    res.status(200).json({ message: "Authenticated." });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

export { loginController, authenticateController };
