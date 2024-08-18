import IOauthAccount from "./OauthAccount.interface";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  password_hash: string;
  oauth_account?: IOauthAccount;
  mal_account?: IOauthAccount;
}

export default IUser;
