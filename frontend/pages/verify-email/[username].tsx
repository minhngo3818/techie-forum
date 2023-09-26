import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
import { verifyEmail } from "@services/auth/auth-services";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import styles from "@styles/VerifyEmail.module.css";
import Error404 from "@components/errors/404";

function useVerifyEmail() {
  return useMutation<void, AxiosError, string>("verifyEmail", verifyEmail);
}

export default function UserVerifyEmail() {
  const router = useRouter();
  const verifyEmail = useVerifyEmail();

  /**
   * Place mutation function inside useRef to prevent losing
   * the function between rerender inside the useEffect
   * which cause exhausted depth issue
   */
  const verifyEmailRef = useRef((token: string) => verifyEmail.mutate(token));

  /**
   * catch the token in query params of url and process verify request
   * replace token param with api processed signal by
   * adding param on route
   */
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.token) {
      let verifyToken = router.query.token.toString();
      verifyEmailRef.current(verifyToken);
      let username = router.query.username?.toString();
      router.replace(`/verify-email/${username}`);
    }
  }, [router, router.query, router.isReady]);

  if (verifyEmail.isLoading) {
    return (
      <div className={styles.veNoneSuccessWrapper}>
        <FadeLoader color="#ffffff" />
      </div>
    );
  }

  if (verifyEmail.isError) {
    return (
      <div className={styles.veNoneSuccessWrapper}>
        <h2 className={styles.veText}>{verifyEmail.error.message}</h2>
      </div>
    );
  }

  if (verifyEmail.isSuccess) {
    return (
      <div className={styles.veMessageWrapper}>
        <div className={styles.veTextWrapper}>
          <h2 className={styles.veHeader}>Email verification processed</h2>
          {
            <p className={styles.veText}>
              <br />
              Well, you&apos;re now an official technomancer fellow.
              <br />
            </p>
          }
          {router.query.processed && (
            <p className={styles.veText}>
              Theres is nothing else to do on this page.
              <br />
              Please close this window or login to your account.
              <br />
            </p>
          )}
        </div>
        <Link className={styles.veLoginLink} href={"/login"}>
          Login Now
        </Link>
      </div>
    );
  }

  return <Error404 />;
}
