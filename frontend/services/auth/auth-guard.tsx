import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./auth-provider";
import { toastResponse } from "@utils/toast-helper";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const REFRESH_INTERVAL = 14 * 60 * 1000;

/**
 * Generic type for server component
 * Temporarily use for querying a list
 */
type ServerProps<T> = {
  list: T[];
  nextId: string;
};

/**
 * Auth guard
 * A wrap around component for a specific page component
 * that need an authorized layer
 * @param Component a client or server component
 * @returns Component if it is authorized, a message otherwise
 */
function authGuard<T>(
  Component: (
    props: InferGetServerSidePropsType<GetServerSideProps<ServerProps<T>>>
  ) => JSX.Element
) {
  return (
    props: InferGetServerSidePropsType<GetServerSideProps<ServerProps<T>>>
  ) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { verifyAuth, refreshAuth, logout } = useAuth();

    /**
     * A wrap around function set auth state
     * depending on the result of a persist agent.
     * A persist agent are Promise base async functions
     * that manage auth tokens.
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
        toastResponse("error", "Unauthorized Access");
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
      return <Component {...props} />;
    }

    return <>401 Unauthorized</>;
  };
}

export default authGuard;
