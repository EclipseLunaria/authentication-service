import { OauthAccounts } from "../entities";
import IAcessToken from "../interfaces/AccessToken.interface";

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

  return accessToken;
};

export { generateAccessToken };
