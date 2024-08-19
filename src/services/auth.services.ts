import { verify as verifyJWT } from "jsonwebtoken";
import { getUser, getUserOauth } from "../utils/database.utils";
import IClientJWT from "../interfaces/ClientJWT.interface";
import { generateAccessToken, generateJwtToken } from "../utils/token.utils";
import jwt from "jsonwebtoken";
const handleTokenAuthentication = async (authHeader: string) => {
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token not found.");
  }
  // get user from token

  const decoded = verifyJWT(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as IClientJWT;

  return decoded;
};

const handleTokenRefresh = async (clientToken: IClientJWT) => {
  console.log("clientToken", clientToken);
  const user = await getUser(clientToken.username);
  const oauthUser = await getUserOauth(user);
  oauthUser.user = user;
  if (oauthUser.refresh_token !== clientToken.refresh_token) {
    throw new Error("Invalid refresh token.");
  }
  if (oauthUser.refresh_token_expires_at < new Date()) {
    throw new Error("Refresh token expired.");
  }
  if (oauthUser.token_expires_at > new Date()) {
    // return existing token
    console.log(
      `${oauthUser.user.username} is still authenticated. Returning existing token.`
    );
    return jwt.sign(clientToken, process.env.ACCESS_TOKEN_SECRET as string);
  }
  const updatedOauthAccount = await generateAccessToken(oauthUser);
  console.log("updatedOauthAccount", updatedOauthAccount);
  const token = generateJwtToken(updatedOauthAccount, user);
  return token;
};

export { handleTokenAuthentication, handleTokenRefresh };
