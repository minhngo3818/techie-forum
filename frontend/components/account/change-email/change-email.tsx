import React, { useState } from "react";
import Router from "next/router";
import { changeEmail } from "@services/auth/auth-services";
import BaseField from "@components/form/field-base/base-field";
import styles from "@styles/Account.module.css";
import { BarLoader } from "react-spinners";

interface ChangeEmailType {
  email: string;
  isVerified?: boolean;
}

const emailChangeMode = {
  LOADING: "LOADING",
  CHANGE: "CHANGE",
  VIEW: "VIEW",
  ERROR: "ERROR",
};

export default function ChangeEmail(props: ChangeEmailType) {
  const [email, setEmail] = useState(props.email);
  const [guiMode, setGuiMode] = useState(emailChangeMode.VIEW);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    setGuiMode(emailChangeMode.LOADING);
    let status = emailChangeMode.VIEW;
    try {
      await changeEmail(email);
    } catch {
      status = emailChangeMode.ERROR;
    } finally {
      setTimeout(() => {
        setGuiMode(status);
      }, 1200);
      Router.reload();
    }
  };

  return (
    <div className={styles.accountSection}>
      <h3 className={styles.accountSecTitle}>Email</h3>
      {guiMode === emailChangeMode.VIEW && (
        <>
          <p className={styles.accountText}>
            {props.email} {props.isVerified ? "" : "[Not verified]"}
          </p>
          {!props.isVerified && (
            <>
              <p className={styles.accountText}>Email has been sent.</p>
              <p className={styles.accountText}>
                If there is no verification email, click &ldquo; Send email &rdquo;
              </p>
            </>
          )}
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnNormal}`}
              onClick={() => setGuiMode(emailChangeMode.CHANGE)}
            >
              Change
            </button>
            {!props.isVerified && (
              <button
                className={`${styles.accountSecBtn} ${styles.accountSecBtnNormal} mx-2`}
                onClick={() => setGuiMode(emailChangeMode.CHANGE)}
              >
                Send email
              </button>
            )}
          </div>
        </>
      )}
      {guiMode === emailChangeMode.CHANGE && (
        <>
          <BaseField
            name="email"
            label="On change guiMode"
            type="text"
            defaultValue={props.email}
            onChange={handleChangeEmail}
            fieldType="input"
          />
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={handleSubmitEmail}
            >
              Submit
            </button>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={() => setGuiMode(emailChangeMode.VIEW)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {guiMode === emailChangeMode.LOADING && (
        <>
          <p className={styles.accountText}>Waiting for response...</p>
          <BarLoader
            color="#ffffff"
            width="100%"
            aria-label="Loading BarLoader"
          />
        </>
      )}
      {guiMode === emailChangeMode.ERROR && (
        <>
          <p className={styles.accountText}>
            Failed to send request ¯\_(ツ)_/¯. Please try again
          </p>
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={handleSubmitEmail}
            >
              Try again
            </button>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={() => setGuiMode(emailChangeMode.VIEW)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
