import { Request, Response } from "express";

const registerUserDirectly = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.json(body);
};

export { registerUserDirectly };
