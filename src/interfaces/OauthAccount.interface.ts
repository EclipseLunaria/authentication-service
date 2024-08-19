interface IOauthAccount {
  id: number;
  user_id: number;
  provider: string;
  provider_id: string;
  access_token: string;
  token_expires_at: Date;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
}

export default IOauthAccount;
