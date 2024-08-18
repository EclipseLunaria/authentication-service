import { AppDataSource } from "../config";
import { Users, OauthAccounts } from "../entities";

const getUser = async (username: string) => {
  return await AppDataSource.getRepository(Users).findOne({
    where: { username: username },
  });
};

const getUserOauth = async (user: Users) => {
  return await AppDataSource.getRepository(OauthAccounts).findOne({
    where: { user: user },
  });
};

const updateOauthAccount = async (oauthAccount: OauthAccounts) => {
  return await AppDataSource.getRepository(OauthAccounts).save(oauthAccount);
};

export { getUser, getUserOauth, updateOauthAccount };
