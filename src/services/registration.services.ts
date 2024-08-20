import { IRegistrationForm } from "../interfaces";
import {
  validateMALRegistrationForm,
  validateRegistrationForm,
} from "../utils/validation.utils";
import { createMALUser, createUser } from "../utils/database.utils";
import IMALRegistration from "../interfaces/mal.registration";

const handleRegistration = async (body: IRegistrationForm) => {
  await validateRegistrationForm(body);
  await createUser(body);
};

const handleMALRegistration = async (body: IMALRegistration) => {
  // handle MAL registration
  console.log("Handling MAL registration");
  console.log(body);
  await validateMALRegistrationForm(body);
  await createMALUser(body);
};

export { handleRegistration, handleMALRegistration };
