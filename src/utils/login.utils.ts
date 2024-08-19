import { hash, compare } from "bcrypt";
import { getUser, getUserOauth } from "./database.utils";
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
  console.log("username", username);
  const user = await getUser(username);
  console.log("user", user);
  if (!user) {
    throw new Error("Username does not exist.");
  }
  if (!(await checkPassword(password, user.password_hash))) {
    throw new Error("Incorrect password.");
  }
  // get oauth account
  const oauthUser = await getUserOauth(user);
  const token = await generateAccessToken(oauthUser);
  return token;
};

export { hashPassword, checkPassword, login };
