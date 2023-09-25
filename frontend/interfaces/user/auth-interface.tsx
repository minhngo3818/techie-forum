import IUser from "./user";

// All field names match with the serializers
type UserName = { username: string };
type Email = { email: string };
type OldPassword = { old_password: string };
type Password = { password: string };
type Password2 = { password2: string };

export interface ILoginForm extends UserName, Password {}

export interface IResetPasswordForm extends Password, Password2 {
  token: string;
  id: string;
}

export interface IChangePasswordForm extends OldPassword, Password, Password2 {}

export interface IRegisterForm extends UserName, Email, Password, Password2 {}

export default interface AuthContextInterface {
  user: IUser | null;
  login: (data: ILoginForm) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: IRegisterForm) => Promise<boolean>;
  verifyAuth: () => Promise<boolean>;
  refreshAuth: () => Promise<boolean>;
  loading: boolean;
}
