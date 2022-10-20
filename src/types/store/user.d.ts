export interface IUser {
  avatar_url?: string;
  id?: number;
  login?: string;
  name?: string;
  html_url?: string;
}

export interface IUserState {
  data: IUser;
  loading: boolean;
  access_token: string;
}
