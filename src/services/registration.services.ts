import { IRegistrationForm } from "../interfaces";
import { validateRegistrationForm } from "../utils/validation.utils";
import { createUser } from "../utils/database.utils";

const handleRegistration = async (body: IRegistrationForm) => {
  await validateRegistrationForm(body);
  await createUser(body);
};

export { handleRegistration };
