import React, { useState, useEffect, useRef } from "react";
import PageTitle from "@components/utils/page-title/page-title";
import BaseField from "@components/form/field-base/base-field";
import styles from "@styles/ForgotPwd.module.css";
import { requestResetPassword } from "@services/auth/auth-services";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let redirect_url = window.location.href;
    let sent = await requestResetPassword(email, redirect_url);
    if (sent) {
      setIsSent(sent);
    }
  };

  return (
    <div className={styles.forgotPwdWrapper}>
      <PageTitle title="Forgot Password" />
      {!isSent ? (
        <form className="w-full" onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.forgotPwdButton}>
              Send request
            </button>
          </div>
        </form>
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
