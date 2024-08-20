import { Request, Response } from "express";
import { login } from "../utils/login.utils";
import {
  handleTokenAuthentication,
  handleTokenRefresh,
} from "../services/auth.services";
import { verify } from "jsonwebtoken";
import IClientJWT from "../interfaces/ClientJWT.interface";

const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const credentials = await login(username, password);
    res.setHeader("Authorization", `Bearer ${credentials.access_token}`);
    res.status(200).json(credentials);
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

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const lastToken = req.headers.authorization.split(" ")[1];
    const decoded = verify(
      lastToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as IClientJWT;

    console.log(decoded);
    const token = await handleTokenRefresh(decoded);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
      message: lastToken !== token ? "Token refreshed" : "Token still valid",
    });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
export { loginController, authenticateController, refreshTokenController };
