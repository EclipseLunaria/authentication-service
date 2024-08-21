import { IRegistrationForm } from "../interfaces";
import {
  validateMALRegistrationForm,
  validateRegistrationForm,
} from "../utils/validation.utils";
import { createMALUser, createUser } from "../utils/database.utils";
import IMALRegistration from "../interfaces/mal.registration";
import { createClientBearerToken } from "../utils/token.utils";

const handleRegistration = async (body: IRegistrationForm) => {
  await validateRegistrationForm(body);
  await createUser(body);
};

const handleMALRegistration = async (body: IMALRegistration) => {
  // handle MAL registration
  console.log("Handling MAL registration");
  console.log(body);
  await validateMALRegistrationForm(body);
  const oauthAccount = await createMALUser(body);
  const bearerToken = await createClientBearerToken(oauthAccount);
  console.log(bearerToken);
  return bearerToken;
};

export { handleRegistration, handleMALRegistration };
