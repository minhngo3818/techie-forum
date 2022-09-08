import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthService";

const AuthGuard = (AuthComponent) => {
  return (props) => {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const { verifyToken } = useContext(AuthContext);

    useEffect(() => {
      let auth = JSON.parse(localStorage.getItem("auth"));
      let accessToken = auth?.access;

      if (!auth || !accessToken) {
        router.replace("/login");
      } else {
        const isValidToken = verifyToken(accessToken);

        if (isValidToken) {
          setIsVerified(true);
        } else {
          localStorage.removeItem("auth");
          setIsVerified(false);
          router.replace("/login");
        }
      }
    }, []);

    return <>{isVerified ? <AuthComponent {...props} /> : null}</>;
  };
};

export default AuthGuard;
