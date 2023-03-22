import UserInterface from "./user-interface";

// All field names match with the serializers
type UserName = { username: string };
type OldPassword = { old_password: string };
type Password = { password: string };
type Password2 = { password2: string };
type AccessToken = { access?: string | null };
type RefreshToken = { refresh?: string | null };
type CSRFToken = { csrftoken?: string | null };

export interface LoginInterface extends UserName, Password {}

export interface ResetPasswordInterface extends Password, Password2 {}

export interface ChangePasswordInterface
  extends OldPassword,
    ResetPasswordInterface {}

export interface RefreshInterface extends AccessToken {}

export interface RegisterInterface extends UserInterface, Password, Password2 {}

export interface AuthTokensInterface
  extends AccessToken,
    RefreshToken,
    CSRFToken {}

export default interface AuthContextInterface {
  user: UserInterface | null;
  // authTokens: AuthTokensInterface | null;
  login: (data: LoginInterface) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterInterface) => Promise<void>;
  changePassword: (data: ChangePasswordInterface) => Promise<void>;
}
