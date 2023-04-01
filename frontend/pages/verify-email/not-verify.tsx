import React from "react"
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { requestVerifyEmail } from "../../services/auth/auth-services";
import styles from "../../styles/VerifyEmail.module.css";

function NotVerifiedEmail() {
  const router = useRouter();

  if (!sessionStorage.getItem("udsf")) {
    router.replace("/");
    return <></>;
  }

  return (
    <div className={styles.veMessageWrapper}>
      <div className={styles.veTextWrapper}>
        <h2 className={styles.veHeader}>Unverified Email. :&#40;</h2>
        <p className={styles.veText}>
          A verification has been sent to your email.
          <br />
          Please click to the attached link.
          <br />
          <br />
          <button
            className="hover:underline text-white font-medium"
            onClick={requestVerifyEmail}
          >
            Click here
          </button>
          if you did not recieved an email
        </p>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(NotVerifiedEmail), {
  ssr: false,
});
