import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { ReactElement } from "react";
import { loginService, logoutService } from "./auth-services";
import { LoginInterface } from "../../interfaces/user/login-interface";
import { AuthInterface } from "../../interfaces/user/auth-interface";
import { UserInterface } from "../../interfaces/user/user-interface";
import { RegisterInterface } from "../../interfaces/user/register-interface";
import { ChangePasswordInterface } from "../../interfaces/user/password-interface";

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactElement }) {
  const router = useRouter();

  const [user, setUser] = useState<null | UserInterface>(null);

  async function login(data: LoginInterface) {
    await loginService(data, setUser);
  }

  async function logout() {
    const response = await logoutService();
    setUser(null);
  }

  async function register(data: RegisterInterface) {}

  async function forgotPassword(data: ChangePasswordInterface) {}

  const auth = {
    user: user,
    login: login,
    logout: logout,
    register: register,
    forgotPassword: forgotPassword,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
