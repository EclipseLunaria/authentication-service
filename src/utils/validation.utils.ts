import { AppDataSource } from "../config";
import { Users } from "../entities";
import { IRegistrationForm } from "../interfaces";

export const validateRegistrationForm = async (body: IRegistrationForm) => {
  const { username, name, email, password } = body;
  if (!username || !name || !email || !password) {
    throw new Error("Please fill out all fields.");
  }
  await checkUsername(username);
  await validateEmail(email);
  checkPassword(password);
};

const checkPassword = (password: string) => {
  if (password.length < 14) {
    throw new Error("Password must be at least 14 characters long.");
  }
  if (!password.match(/[a-z]/)) {
    throw new Error("Password must contain at least one lowercase letter.");
  }
  if (!password.match(/[A-Z]/)) {
    throw new Error("Password must contain at least one uppercase letter.");
  }
  if (!password.match(/[0-9]/)) {
    throw new Error("Password must contain at least one number.");
  }
};

const validateEmail = async (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address.");
  }
  if (email.length > 255) {
    throw new Error("Email must be at most 255 characters long.");
  }
  if (await checkEmailExists(email)) {
    throw new Error("Email already exists.");
  }
};

const checkEmailExists = async (email: string) => {
  // Check if the email already exists

  return (
    (await AppDataSource.getRepository(Users).findOne({
      where: { email: email },
    })) !== null
  );
};
const checkUsername = async (username: string) => {
  if (await checkUsernameExists(username)) {
    throw new Error("Username already exists.");
  }
  if (username.length < 6) {
    throw new Error("Username must be at least 6 characters long.");
  }
  if (username.length > 20) {
    throw new Error("Username must be at most 20 characters long.");
  }
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    throw new Error("Username must contain only letters and numbers.");
  }
  if (!username.match(/[a-zA-Z]/)) {
    throw new Error("Username must contain at least one letter.");
  }
};

export const checkUsernameExists = async (username: string) => {
  // Check if the username already exists

  return (
    (await AppDataSource.getRepository(Users).findOne({
      where: { username: username },
    })) !== null
  );
};
