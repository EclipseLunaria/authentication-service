import { OauthAccounts } from "../entities";
import IAcessToken from "../interfaces/AccessToken.interface";
import jwt from "jsonwebtoken";
import { updateOauthAccount } from "./database.utils";

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
  oauthUser.refresh_token_expires_at = accessToken.refresh_expires_at;
  oauthUser.updated_at = new Date();
  await updateOauthAccount(oauthUser);
  return generateJwtToken(oauthUser);
};

const generateJwtToken = (oauthUser: OauthAccounts) => {
  const tokenPayload = {
    id: oauthUser.id,
    token: oauthUser.access_token,
    provider: oauthUser.provider,
    provider_id: oauthUser.provider_id,
  };

  const token = jwt.sign(
    tokenPayload,
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return token;
};

export { generateAccessToken, generateJwtToken };
