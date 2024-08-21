interface IClientJWT {
  user_id: string;
  username: string;
  email: string;
  provider: string;
  refresh_token: string;
  access_token: string;
  token_expires_at: Date;
}

export default IClientJWT;
