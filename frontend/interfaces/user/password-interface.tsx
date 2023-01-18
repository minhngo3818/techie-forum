export interface ResetPasswordInterface {
  password: string;
  password2: string;
}

export interface ChangePasswordInterface extends ResetPasswordInterface {
  old_password: string;
}
