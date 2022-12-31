import React, { useState, useRef, useCallback } from "react";
import BaseField from "../../form/field-base/base-field";
import styles from "../../../styles/Account.module.css";
import { BarLoader } from "react-spinners";

interface ChangeEmailType {
  email: string;
}

export default function ChangeEmail(props: ChangeEmailType) {
  const [email, setEmail] = useState(props.email);
  const [isChangeMode, setChangeMode] = useState(false);
  const [isVerifying, setVerifying] = useState(false);

  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const handleSubmitEmail = () => {
    console.log("Email submited");
  };

  return (
    <div className={styles.accountSection}>
      <h3 className={styles.accountSecTitle}>Email</h3>
      {!isChangeMode && (
        <>
          <p className={styles.accountText}>{props.email}</p>
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnNormal}`}
              onClick={() => setChangeMode(!isChangeMode)}
            >
              Change
            </button>
          </div>
        </>
      )}
      {isChangeMode && (
        <>
          <BaseField
            name="email"
            label="Change Email"
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
              onClick={() => setChangeMode(!isChangeMode)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {isVerifying && (
        <>
          <p className={styles.accountText}>Await for verifying email...</p>
          <BarLoader
            color="#ffffff"
            width="full"
            aria-label="Loading BarLoader"
          />
        </>
      )}
    </div>
  );
}
