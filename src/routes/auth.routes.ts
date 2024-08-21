import express, { Router, Request, Response, response } from "express";

import { loginController } from "../controllers";
import {
  authenticateController,
  refreshTokenController,
} from "../controllers/auth.controllers";
import axios from "axios";
import { getMALUser } from "../utils/oauth.utils";

const authRouter = Router();
authRouter.use(express.json());

authRouter.post("/login", loginController);

authRouter.post("/verify", authenticateController);

authRouter.post("/refresh", refreshTokenController);

authRouter.get("/mal/authorize", (req: Request, res: Response) => {
  const redirectUri = process.env.REDIRECT_URI;
  console.log("Redirect URI:", redirectUri);
  const malAuthUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.MAL_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&state=your_random_state&code_challenge=${process.env.CODE_CHALLENGE}`;
  res.redirect(malAuthUrl);
});

authRouter.get("/mal/callback", async (req, res) => {
  const { code, state } = req.query;
  // Make state random
  if (state !== "your_random_state") {
    return res.status(403).send("State mismatch");
  }
  console.log(code, state);

  try {
    const response = await axios.post(
      "https://myanimelist.net/v1/oauth2/token",
      new URLSearchParams({
        client_id: process.env.MAL_CLIENT_ID as string,
        client_secret: process.env.MAL_CLIENT_SECRET as string,
        code: code as string,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI as string,
        code_verifier: process.env.CODE_CHALLENGE as string,
      }).toString()
    );

    const { access_token, refresh_token, expires_in, id } = response.data;
    const user_id = await getMALUser(access_token);
    console.log("data", response.data);
    const redirectUrl = `${process.env.CLIENT_BASE_URL}/register/mal?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}&mal_id=${user_id}`;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("OAuth Error:", error.message);
    }
    res.status(500).send("Error during OAuth process");
  }
});

export { authRouter };
