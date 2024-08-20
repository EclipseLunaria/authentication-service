interface IMALRegistration {
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
  token_expires_at: Date;
  provider: string;
  provider_id: string;
}

export default IMALRegistration;
