import axios from "axios";

const FORM = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123",
  created_at: new Date(),
  updated_at: new Date(),
  password_hash: "hashedPassword",
  password_salt: "passwordSalt",
};

const test = async () => {
  const response = await axios.post("http://localhost:5000/registration", FORM);
  console.log(response.data);
};

(async () => {
  await test();
})();
