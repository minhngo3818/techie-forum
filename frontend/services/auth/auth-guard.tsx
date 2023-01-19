import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { ReactElement } from "react";
import {
  loginService,
  logoutService,
  registerService,
  resetPasswordService,
  verifyEmailService,
} from "./auth-services";
import { toast } from "react-toastify";
import { LoginInterface } from "../../interfaces/user/login-interface";
import { AuthInterface } from "../../interfaces/user/auth-interface";
import { UserInterface } from "../../interfaces/user/user-interface";
import { RegisterInterface } from "../../interfaces/user/register-interface";
import { ChangePasswordInterface } from "../../interfaces/user/password-interface";
import { clearTimeout } from "timers";

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactElement }) {
  const router = useRouter();

  const [user, setUser] = useState<null | UserInterface>(null);

  async function login(data: LoginInterface) {
    const response = await loginService(data);

    if (response.status === 200) {
      if (!response.data.is_active) {
        console.log("active account request has been sent");
        router.push("/");
        return;
      }

      if (!response.data.is_verified) {
        toast.error("Please check your email to verify your account", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/verify-email");
        return;
      }

      setUser({
        username: response.data.username,
        email: response.data.email,
        is_verified: response.data.is_verified,
        is_active: response.data.is_active,
      });
      router.push("/forum");
    }
  }

  async function logout() {
    const response = await logoutService();
    setUser(null);
  }

  async function register(data: RegisterInterface) {
    const response = await registerService(data);

    if (response.status === 201) {
      await verifyEmailService();
    }

    router.push("/verify-email");
  }

  async function forgotPassword(data: ChangePasswordInterface) {
    if (!user) {
      router.push("/login");
      return;
    }

    const response = await resetPasswordService(data);

    if (response.status === 200) {
      toast.success("Password has changed successfully!");
      let redirectProcess = setTimeout(() => {
        router.reload();
        clearTimeout(redirectProcess);
      }, 3000);
    }
  }

  const auth = {
    user: user,
    login: login,
    logout: logout,
    register: register,
    forgotPassword: forgotPassword,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
