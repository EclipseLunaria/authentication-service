interface IAcessToken {
  access_token: string;
  token_expires_at: Date;
  refresh_token: string;
  refresh_expires_at: Date;
  token_type: string;
}

export default IAcessToken;
