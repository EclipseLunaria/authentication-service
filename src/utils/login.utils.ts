import { hash, compare } from "bcrypt";
import { getUser, getUserOauth, updateOauthAccount } from "./database.utils";
import { get } from "http";
import { OauthAccounts } from "../entities";
import { generateAccessToken } from "./auth.utils";

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

const login = async (username: string, password: string) => {
  const user = await getUser(username);
  if (!user) {
    throw new Error("Username does not exist.");
  }
  if (!(await checkPassword(password, user.password_hash))) {
    throw new Error("Incorrect password.");
  }
  // get oauth account
  const oauthUser = await getUserOauth(user);

  const token = await generateAccessToken(oauthUser);
  oauthUser.access_token = token.access_token;
  oauthUser.refresh_token = token.refresh_token;
  oauthUser.token_expires_at = token.token_expires_at;
  oauthUser.refresh_token_expires_at = token.refresh_expires_at;
  oauthUser.updated_at = new Date();
  await updateOauthAccount(oauthUser);
  return token;
};

export { hashPassword, checkPassword, login };
