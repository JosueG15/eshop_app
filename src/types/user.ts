export interface IRegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  street: string;
  apartment?: string;
  city: string;
  zip: string;
  country: string;
  phone: number;
  isAdmin: boolean;
}
