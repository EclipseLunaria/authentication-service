interface IClientJWT {
  user_id: string;
  username: string;
  email: string;
  provider: string;
  refresh_token: string;
}

export default IClientJWT;
