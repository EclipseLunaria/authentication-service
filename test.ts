import axios from "axios";
import { IRegistrationForm } from "./src/interfaces";
const FORM: IRegistrationForm = {
  name: "John Doe",
  email: "johndoe@example.comc",
  password: "Password1234567",
  username: "johndoe2",
};

const test = async () => {
  const response1 = await axios.post(
    "http://localhost:5000/registration",
    FORM
  );
  console.log(response1.data);
  const response2 = await axios.post("http://localhost:5000/auth/login", {
    username: "johndoe2",
    password: "Password1234567",
  });
  console.log(response2.data);
};

(async () => {
  await test();
})();
