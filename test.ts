import axios from "axios";
import { IRegistrationForm } from "./src/interfaces";
const FORM: IRegistrationForm = {
  name: "John Doe",
  email: "johndoe@example.comc",
  password: "Password1234567",
  username: "johndoe2",
};

const test = async () => {
  const response = await axios.post("http://localhost:5000/registration", FORM);
  console.log(response.data);
};

(async () => {
  await test();
})();
