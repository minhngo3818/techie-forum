import React, { useState, useEffect, useRef, useCallback } from "react";
import BaseField from "../../form/field-base/base-field";
import styles from "../../../styles/Account.module.css";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    password: "",
    password2: "",
  });
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const [isChangeMode, setChangeMode] = useState(false);
  const [isVerifying, setVerifying] = useState(false);

  const handleChangePassword = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setPasswords((passwords) => ({ ...passwords, [name]: value }));
    },
    []
  );

  const hanldeSubmitPassword = () => {};

  return (
    <div className={styles.accountSection}>
      <h3 className={styles.accountSecTitle}>Password</h3>
      {isChangeMode && (
        <form>
          <BaseField
            innerRef={oldPasswordRef}
            name="oldPassword"
            label="Old Password"
            type="password"
            value={passwords.oldPassword}
            onChange={handleChangePassword}
            placeholder="Enter old password"
            fieldType="input"
          />
          <BaseField
            innerRef={passwordRef}
            name="password"
            label="New Password"
            type="password"
            value={passwords.password}
            onChange={handleChangePassword}
            placeholder="Enter new password"
            fieldType="input"
          />
          <BaseField
            innerRef={password2Ref}
            name="password2"
            label="Confirm Password"
            type="password"
            value={passwords.password2}
            onChange={handleChangePassword}
            placeholder="Re-enter new password"
            fieldType="input"
          />
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={hanldeSubmitPassword}
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
        </form>
      )}
      {!isChangeMode && (
        <>
          <p className={styles.accountText}>******</p>
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
    </div>
  );
}
