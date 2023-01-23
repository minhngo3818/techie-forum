import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import PageTitle from "../../../components/utils/page-title/page-title";
import BaseField from "../../../components/form/field-base/base-field";
import styles from "../../../styles/ForgotPwd.module.css";
import {
  EventTargetNameValue,
  FormEvent,
} from "../../../interfaces/forum/form/form-field";

const initialState = {
  password: "",
  password2: "",
};

function PasswordRecover() {
  const changed = true;
  const [pwdValues, setPwdValues] = useState(initialState);
  const pwdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pwdRef.current) {
      pwdRef.current.focus();
    }
  });

  const handleChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setPwdValues((val) => ({ ...val, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Send password change request");
  }, []);

  return (
    <form className={styles.forgotPwdWrapper} onSubmit={handleSubmit}>
      {changed ? (
        <>
          <PageTitle title="Password Recovery" />
          <BaseField
            innerRef={pwdRef}
            label="New Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={pwdValues.password}
            onChange={handleChange}
            fieldType="input"
          />
          <BaseField
            innerRef={pwdRef}
            label="Confirm Password"
            name="password"
            type="password"
            placeholder="Re-enter password"
            value={pwdValues.password2}
            onChange={handleChange}
            fieldType="input"
          />
        </>
      ) : (
        <PageTitle title="Password was changed successfully!!" />
      )}
      <div className={styles.forgotPwdBtnWrapper}>
        {changed ? (
          <button type="submit" className={styles.forgotPwdButton}>
            Submit
          </button>
        ) : (
          <Link href="/" className={styles.forgotPwdButton}>
            Return to Login Page
          </Link>
        )}
      </div>
    </form>
  );
}

export default PasswordRecover;
