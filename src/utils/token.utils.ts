import { OauthAccounts, Users } from "../entities";
import IAcessToken from "../interfaces/AccessToken.interface";
import jwt from "jsonwebtoken";
import { updateOauthAccount } from "./database.utils";
import IClientJWT from "../interfaces/ClientJWT.interface";

const generateTokenString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateAccessToken = async (oauthUser: OauthAccounts) => {
  const accessToken: IAcessToken = {
    access_token: generateTokenString(32),
    token_expires_at: new Date(Date.now() + 20 * 60 * 1000),
    refresh_token: generateTokenString(64),
    refresh_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    token_type: "grant",
  };
  oauthUser.access_token = accessToken.access_token;
  oauthUser.refresh_token = accessToken.refresh_token;
  oauthUser.token_expires_at = accessToken.token_expires_at;
  oauthUser.updated_at = new Date();
  return await updateOauthAccount(oauthUser);
};

const generateJwtToken = (oauthUser: OauthAccounts, user: Users) => {
  console.log(oauthUser);
  const tokenPayload: IClientJWT = {
    user_id: user.id,
    username: user.username,
    email: user.email,
    provider: oauthUser.provider,
    refresh_token: oauthUser.refresh_token,
  };
  const token = jwt.sign(
    tokenPayload,
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return token;
};

export { generateAccessToken, generateJwtToken };
