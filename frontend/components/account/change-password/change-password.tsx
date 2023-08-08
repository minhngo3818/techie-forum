import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { changePassword } from "../../../services/auth/auth-services";
import BaseField from "../../form/field-base/base-field";
import styles from "../../../styles/Account.module.css";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";
import { BarLoader } from "react-spinners";
import { IChangePasswordForm } from "../../../interfaces/user/auth-interface";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,30}$/;

const pwdChangeMode = {
  LOADING: "LOADING",
  CHANGE: "CHANGE",
  VIEW: "VIEW",
  ERROR: "ERROR",
};

export default function ChangePassword() {
  const [passwords, setPasswords] = useState<IChangePasswordForm>({
    old_password: "",
    password: "",
    password2: "",
  });
  const [guiMode, setGuiMode] = useState(pwdChangeMode.VIEW);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setPasswordMatch] = useState(false);

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(passwords.password));
    setPasswordMatch(passwords.password === passwords.password2);
  }, [passwords.password, passwords.password2]);

  const handleChangePassword = ({
    target: { name, value },
  }: EventTargetNameValue) => {
    setPasswords((passwords) => ({ ...passwords, [name]: value }));
  };

  const hanldeSubmitPassword = async () => {
    setGuiMode(pwdChangeMode.LOADING);
    let status = pwdChangeMode.VIEW;
    try {
      await changePassword(passwords);
    } catch {
      status = pwdChangeMode.ERROR;
    } finally {
      setTimeout(() => {
        setGuiMode(status);
      }, 1200);
      Router.reload();
    }
  };

  return (
    <div className={styles.accountSection}>
      <h3 className={styles.accountSecTitle}>Password</h3>
      {guiMode === pwdChangeMode.CHANGE && (
        <form>
          <BaseField
            innerRef={oldPasswordRef}
            name="oldPassword"
            label="Old Password"
            type="password"
            value={passwords.old_password}
            onChange={handleChangePassword}
            placeholder="Enter old password"
            fieldType="input"
            required={true}
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
            isValid={isValidPassword}
            isRegrex={true}
            required={true}
          />
          {passwords.password !== "" && !isValidPassword && (
            <ul className="w-[90%] flex flex-col justify-start text-smoke text-sm">
              <li>♦️ Password must contain at least 8 characters</li>
              <li>
                ♦️ Include upper & lowercase letters, a number & a special
                character.
              </li>
              <li>
                ♦️ Allowed special characters:
                <span aria-label="exclamation mark" className="ml-1">
                  !
                </span>
                <span aria-label="at symbol" className="ml-1">
                  @
                </span>
                <span aria-label="hashtag" className="ml-1">
                  #
                </span>
                <span aria-label="dollar sign" className="ml-1">
                  $
                </span>
                <span aria-label="percent" className="ml-1">
                  %
                </span>
              </li>
            </ul>
          )}
          <BaseField
            innerRef={password2Ref}
            name="password2"
            label="Confirm Password"
            type="password"
            value={passwords.password2}
            onChange={handleChangePassword}
            placeholder="Re-enter new password"
            fieldType="input"
            isValid={isPasswordMatch}
            isRegrex={true}
            required={true}
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
              onClick={() => setGuiMode(pwdChangeMode.VIEW)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {guiMode === pwdChangeMode.VIEW && (
        <>
          <p className={styles.accountText}>******</p>
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnNormal}`}
              onClick={() => setGuiMode(pwdChangeMode.CHANGE)}
            >
              Change
            </button>
          </div>
        </>
      )}
      {guiMode === pwdChangeMode.LOADING && (
        <>
          <p className={styles.accountText}>Waiting for response...</p>
          <BarLoader
            color="#ffffff"
            width="100%"
            aria-label="Loading BarLoader"
          />
        </>
      )}
      {guiMode === pwdChangeMode.ERROR && (
        <>
          <p className={styles.accountText}>
            Failed to send request ¯\_(ツ)_/¯. Please try again
          </p>
          <div className={styles.accountSecBtnWrapper}>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={hanldeSubmitPassword}
            >
              Try again
            </button>
            <button
              className={`${styles.accountSecBtn} ${styles.accountSecBtnSmall}`}
              onClick={() => setGuiMode(pwdChangeMode.VIEW)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
