import { LoginInterface } from "./login-interface";
import { RegisterInterface } from "./register-interface";
import { UserInterface } from "./user-interface";
import ForgotPassword from "../../pages/forgot-password/index";
import { ChangePasswordInterface } from "./password-interface";

export interface AuthInterface {
  user: null | UserInterface;
  login: (data: LoginInterface) => void;
  logout: () => void;
  register: (data: RegisterInterface) => void;
  forgotPassword: (data: ChangePasswordInterface) => void;
}
