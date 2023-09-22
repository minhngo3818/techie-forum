import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageTitle from "@components/utils/page-title/page-title";
import BaseField from "@components/form/field-base/base-field";
import {
  EventTargetNameValue,
  FormEvent,
} from "@interfaces/forum/form/form-field";
import { resetPassword } from "@services/auth/auth-services";
import styles from "@styles/ForgotPwd.module.css";

const initialState = {
  password: "",
  password2: "",
};

function PasswordRecover() {
  const router = useRouter();
  const [isChanged, setIsChanged] = useState(false);
  const [pwdValues, setPwdValues] = useState(initialState);
  const pwdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pwdRef.current) {
      pwdRef.current.focus();
    }
  });

  const handleChange = ({ target: { name, value } }: EventTargetNameValue) => {
    setPwdValues((val) => ({ ...val, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = router.query.id as string;
    let token = router.query.token as string;
    let isSuccess = await resetPassword({
      password: pwdValues.password,
      password2: pwdValues.password2,
      id: id,
      token: token,
    });
    setIsChanged(isSuccess);
  };

  if (isChanged) {
    return (
      <div className={styles.forgotPwdWrapper}>
        <PageTitle title="Password was changed successfully!!" />
        <div className={styles.forgotPwdBtnWrapper}>
          <Link href="/" className={styles.forgotPwdButton}>
            Return to Login Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.forgotPwdWrapper} onSubmit={handleSubmit}>
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
      <div className={styles.forgotPwdBtnWrapper}>
        <button type="submit" className={styles.forgotPwdButton}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default PasswordRecover;
