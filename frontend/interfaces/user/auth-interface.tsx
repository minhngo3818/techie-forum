import UserInterface from "./user-interface";

// All field names match with the serializers
type UserName = { username: string };
type OldPassword = { old_password: string };
type Password = { password: string };
type Password2 = { password2: string };

export interface LoginInterface extends UserName, Password {}

export interface ResetPasswordInterface extends Password, Password2 {}

export interface ChangePasswordInterface
  extends OldPassword,
    ResetPasswordInterface {}

export interface RegisterInterface extends UserInterface, Password, Password2 {}

export default interface AuthContextInterface {
  user: UserInterface | null;
  login: (data: LoginInterface) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterInterface) => Promise<boolean>;
  verifyUser: () => Promise<boolean>;
  changePassword: (data: ChangePasswordInterface) => Promise<void>;
  loading: boolean;
}
