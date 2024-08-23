import { hash, compare } from "bcrypt";
import { getUser, getUserOauth } from "./database.utils";
import { generateAccessToken, generateJwtToken } from "./token.utils";
import { OauthAccounts, Users } from "../entities";
import IBearerBody from "../interfaces/Bearer.interfaces";

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
  return JSON.stringify(await createBearerResponse(oauthUser, user));
};

export { hashPassword, checkPassword, login };

const createBearerResponse = async (oauthUser: OauthAccounts, user: Users) => {
  const patchedOauthAccount = await generateAccessToken(oauthUser);

  const body: IBearerBody = {
    access_token: generateJwtToken(patchedOauthAccount, user),
    token_expires_in:
      Number(patchedOauthAccount.token_expires_at) - Number(Date.now()),
    refresh_token: patchedOauthAccount.refresh_token,
    token_type: "Bearer",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: ["user"],
    },
  };
  console.log("Bearer Body:", body);
  return body;
};
