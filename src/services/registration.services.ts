import { IRegistrationForm } from "../interfaces";
import { Users } from "../entities";
import { hashPassword } from "../utils/login.utils";
import { validateRegistrationForm } from "../utils/validation.utils";
import { AppDataSource } from "../config";

const handleRegistration = async (body: IRegistrationForm) => {
  const { username, name, email, password } = body;
  const user = new Users();
  await validateRegistrationForm(body);
  user.username = username;
  user.email = email;
  user.password_hash = await hashPassword(password);
  user.name = name;
  user.created_at = new Date();
  user.updated_at = new Date();
  await AppDataSource.getRepository(Users).save(user);
  // Check if the user already exists
};

export { handleRegistration };
