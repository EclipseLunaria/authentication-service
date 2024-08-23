interface IBearerBody {
  access_token: string;
  token_expires_in: number;
  refresh_token: string;
  token_type: string;
  user: UserInfo;
}

interface UserInfo {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export default IBearerBody;
