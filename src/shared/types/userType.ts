export interface IRegisterResponse {
  token: string;
  user: IUser;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IDecodedToken {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isAdmin: boolean;
  avatar?: string;
}
