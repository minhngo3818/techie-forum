import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./auth-provider";

const authGuard = (Component: () => JSX.Element) => {
  return () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { verifyUser, logout } = useAuth();
    const verifyUserAuth = async () => {
      let user = sessionStorage.getItem("techie:traits");
      if (!user && !isAuthenticated) {
        router.replace("/login");
      } else {
        let isVerified = await verifyUser();

        if (isVerified) {
          setIsAuthenticated(true);
        } else {
          await logout();
          setIsAuthenticated(false);
          sessionStorage.removeItem("techie:traits");
          router.replace("/login");
        }
      }
    };
    useEffect(() => {
      verifyUserAuth();
    }, []);

    if (isAuthenticated) {
      return <Component />;
    } else {
      return <></>;
    }
  };
};

export default authGuard;
