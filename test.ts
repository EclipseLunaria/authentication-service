import axios from "axios";
import { IRegistrationForm } from "./src/interfaces";
const FORM: IRegistrationForm = {
  name: "Apollyon Grimflare",
  email: "johndoe@example.comc",
  password: "Password1234567",
  username: "apollyongrimflare",
};

const test = async () => {
  // const response1 = await axios.post(
  //   "http://localhost:5000/registration",
  //   FORM
  // );
  // console.log(response1.data);

  const response2 = await axios.post("http://localhost:5000/auth/login", {
    username: "apollyongrimflare",
    password: "Password1234567",
  });
  const token = response2.headers.authorization;
  console.log(response2.data);
  // const response3 = await axios.post(
  //   "http://localhost:5000/auth/verify",
  //   {},
  //   {
  //     headers: {
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9pZCI6MSwibmFtZSI6IkFwb2xseW9uIEdyaW1mbGFyZSIsInRva2VuIjoiQjRia0ZuR2V1cjM0YXp0NlhvQXNxNlJTSWI5RzN3TXAiLCJwcm92aWRlciI6Imx1bmFyaWF1dGgiLCJwcm92aWRlcl9pZCI6IjEiLCJpYXQiOjE3MjQwMzI0MzV9.SKWRNt2AOAKGIg3V6osANf7rMPoN9XPH1Ls9813bRxg",
  //     },
  //   }
  // );
  // console.log(response3.data);

  const response4 = await axios.post(
    "http://localhost:5000/auth/refresh",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(response4.data);
};

(async () => {
  await test();
})();
