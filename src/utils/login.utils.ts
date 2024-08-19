import { hash, compare } from "bcrypt";
import { getUser, getUserOauth } from "./database.utils";
import { generateAccessToken, generateJwtToken } from "./token.utils";

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
  const updatedOauthAccount = await generateAccessToken(oauthUser);
  return generateJwtToken(updatedOauthAccount, user);
};

export { hashPassword, checkPassword, login };
