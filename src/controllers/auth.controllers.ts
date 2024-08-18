import { login } from "../utils/login.utils";

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    res.status(200).json(token);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const authenticateController = async (req, res) => {
  try {
    res.status(200).json({ message: "Authenticated." });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export { loginController, authenticateController };
