import { AppDataSource } from "../config";
import { Users, OauthAccounts } from "../entities";
import { IRegistrationForm } from "../interfaces";

const getUser = async (username: string) => {
  return await AppDataSource.getRepository(Users).findOne({
    where: { username: username },
  });
};

const createUser = async (body: IRegistrationForm) => {
  const user = new Users();
  user.username = body.username;
  user.email = body.email;
  user.password_hash = body.password;
  user.name = body.name;
  user.created_at = new Date();
  user.updated_at = new Date();
  return user;
};

const getUserOauth = async (user: Users) => {
  const oauthAccount = await AppDataSource.getRepository(OauthAccounts).findOne(
    {
      where: { user: user },
    }
  );
  if (!oauthAccount) {
    console.log("Creating oauth account");
    return await createOauthAccount(user);
  }
  return oauthAccount;
};

const createOauthAccount = async (user: Users) => {
  const oauthAccount = new OauthAccounts();
  oauthAccount.user = user;
  oauthAccount.provider = "direct";
  oauthAccount.provider_id = user.id.toString();
  oauthAccount.updated_at = new Date();
  return await AppDataSource.getRepository(OauthAccounts).save(oauthAccount);
};

const updateOauthAccount = async (oauthAccount: OauthAccounts) => {
  return await AppDataSource.getRepository(OauthAccounts).save(oauthAccount);
};

export {
  getUser,
  getUserOauth,
  updateOauthAccount,
  createUser,
  createOauthAccount,
};
