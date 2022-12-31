import React, { useState, useEffect, useRef, useCallback } from "react";
import PageTitle from "../../components/utils/page-title/page-title";
import BaseField from "../../components/form/field-base/base-field";
import styles from "../../styles/ForgotPwd.module.css";
import { EventTargetNameValue } from "../../interfaces/form-field";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  });

  const handleChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setEmail((val) => val);
    },
    []
  );

  const sent = true;
  return (
    <div className={styles.forgotPwdWrapper}>
      <PageTitle title="Forgot Password" />
      {sent ? (
        <>
          <BaseField
            innerRef={emailRef}
            label="Enter your email"
            name="email"
            type="email"
            placeholder="yoshikagekira@gmail.com"
            value={email}
            onChange={handleChange}
            fieldType="input"
          />
          <div className={styles.forgotPwdBtnWrapper}>
            <button className={styles.forgotPwdButton}>Send request</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="my-4 w-full text-center text-light-gray text-xl">
            Request was sent successfully !!!
          </h3>
          <p className="text-light-gray text-lg">
            - Password recovery has been sent to your email.
            <br />- Please <strong>verify</strong> and <strong>access</strong>{" "}
            the link to set your new password.
          </p>
        </>
      )}
    </div>
  );
}
export default ForgotPassword;
