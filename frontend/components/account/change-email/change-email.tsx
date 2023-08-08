import React, { useState, useRef, useCallback } from "react";
import Router from "next/router";
import { changeEmail } from "../../../services/auth/auth-services";
import BaseField from "../../form/field-base/base-field";
import styles from "../../../styles/Account.module.css";
import { BarLoader } from "react-spinners";

interface ChangeEmailType {
  email: string;
  isVerified?: boolean;
}

const emailChangeStatus = {
  LOADING: "LOADING",
  CHANGE: "CHANGE",
  VIEW: "VIEW",
  ERROR: "ERROR",
};

export default function ChangeEmail(props: ChangeEmailType) {
  const [email, setEmail] = useState(props.email);
  const [emailChange, setEmailChange] = useState(emailChangeStatus.VIEW);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    setEmailChange(emailChangeStatus.LOADING);
    let status = emailChangeStatus.VIEW;
    try {
      await changeEmail(email);
    } catch {
      status = emailChangeStatus.ERROR;
    } finally {
      setTimeout(() => {
        setEmailChange(status);
      }, 1200);
      Router.reload();
    }
  };

  return (
    <div className={styles.accountSection}>
      <h3 className={styles.accountSecTitle}>Email</h3>
      {emailChange === emailChangeStatus.VIEW && (
        <>
          <p className={styles.accountText}>
            {props.email} {props.isVerified ? "" : "[Not verified]"}
          </p>
          {!props.isVerified && (
            <>
              <p className={styles.accountText}>Email has been sent.</p>
              <p className={styles.accountText}>
                If there is no verification email, click "Send email"
              </p>
            </>
          )}
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnNormal}`}
              onClick={() => setEmailChange(emailChangeStatus.CHANGE)}
            >
              Change
            </button>
            {!props.isVerified && (
              <button
                className={`${styles.accountSecBtn} ${styles.accountSecBtnNormal} mx-2`}
                onClick={() => setEmailChange(emailChangeStatus.CHANGE)}
              >
                Send email
              </button>
            )}
          </div>
        </>
      )}
      {emailChange === emailChangeStatus.CHANGE && (
        <>
          <BaseField
            name="email"
            label="On change mode"
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
              onClick={() => setEmailChange(emailChangeStatus.VIEW)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {emailChange === emailChangeStatus.LOADING && (
        <>
          <p className={styles.accountText}>Waiting for response...</p>
          <BarLoader
            color="#ffffff"
            width="100%"
            aria-label="Loading BarLoader"
          />
        </>
      )}
      {emailChange === emailChangeStatus.ERROR && (
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
              onClick={() => setEmailChange(emailChangeStatus.VIEW)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
