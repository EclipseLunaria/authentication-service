import { IRegistrationForm } from "../interfaces";
import { OauthAccounts, Users } from "../entities";
import { hashPassword } from "../utils/login.utils";
import { validateRegistrationForm } from "../utils/validation.utils";
import { AppDataSource } from "../config";
import { createOauthAccount, createUser } from "../utils/database.utils";

const handleRegistration = async (body: IRegistrationForm) => {
  await validateRegistrationForm(body);
  await createUser(body);
};

export { handleRegistration };
