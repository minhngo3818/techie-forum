import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./auth-provider";

const REFRESH_INTERVAL = 14 * 60 * 1000;

function authGuard(Component: () => JSX.Element) {
  return () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { verifyAuth, refreshAuth, logout } = useAuth();

    /**
     * A wrap around function to persist auth state
     * that accept Promise base async function
     * @param persistAgent Promise base async function
     * @returns void
     */
    const persistAuthHandler = async (persistAgent: () => Promise<boolean>) => {
      let isVerified = await persistAgent();

      if (isVerified) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/login");
        logout();
      }
    };

    const verifyAuthhHandler = async () => persistAuthHandler(verifyAuth);
    const refreshAuthHandler = async () => persistAuthHandler(refreshAuth);

    useEffect(() => {
      verifyAuthhHandler();
      const intervalRefresh = setInterval(refreshAuthHandler, REFRESH_INTERVAL);

      return () => {
        clearInterval(intervalRefresh);
      };
    }, []);

    if (isAuthenticated) {
      return <Component />;
    }

    return <>401 Unauthorized</>;
  };
}

export default authGuard;
