import { verify as verifyJWT } from "jsonwebtoken";

const handleTokenAuthentication = async (authHeader: string) => {
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token not found.");
  }
  const decoded = verifyJWT(token, process.env.ACCESS_TOKEN_SECRET as string);
  console.log(decoded);
  return decoded;
};

export { handleTokenAuthentication };
