import React, { useState, useEffect, useRef, useCallback } from "react";
import PageTitle from "../components/utils/page-title/page-title";
import BaseField from "../components/form/field-base/base-field";
import {
  EventTargetNameValue,
  FormEvent,
} from "../interfaces/forum/post/form-field";
import styles from "../styles/Register.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,30}$/;

const initialState = {
  username: "",
  email: "",
  password: "",
  password2: "",
};

function Register() {
  const [regValues, setRegValues] = useState(initialState);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  // Validate inputs
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setPasswordMatch] = useState(false);

  // Check successful request
  const [success, setSuccess] = useState(false);

  // Focus on username field when the page first initialize
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setIsValidName(USER_REGEX.test(regValues.username));
  }, [regValues.username]);

  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(regValues.password));
    setPasswordMatch(regValues.password === regValues.password2);
  }, [regValues.password, regValues.password2]);

  const handleChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setRegValues((val) => ({ ...val, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isPasswordMatch) {
        console.log({
          username: regValues.username,
          email: regValues.email,
          password: regValues.password,
          password2: regValues.password2,
        });
      }
      setSuccess(true);
      // Refresh signUp state
      setRegValues(initialState);

      alert("Requested account registration");
    },
    [regValues, isPasswordMatch]
  );

  return (
    <form className={styles.registerWrapper} onSubmit={handleSubmit}>
      <PageTitle title="Register" />
      <BaseField
        innerRef={usernameRef}
        label="Username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={regValues.username}
        onChange={handleChange}
        isRegrex={true}
        isValid={isValidName}
        required={true}
        fieldType="input"
      />
      {regValues.username !== "" && !isValidName && (
        <ul className={styles.registerRegrexInfo}>
          <li>♦️ Username must contain from 4 to 24 characters </li>
          <li>♦️ Must start with a letter</li>
          <li>
            ♦️ Special characters are not allowed except hypen and underscore
          </li>
        </ul>
      )}
      <BaseField
        innerRef={emailRef}
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={regValues.email}
        onChange={handleChange}
        required={true}
        fieldType="input"
      />
      <BaseField
        innerRef={passwordRef}
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={regValues.password}
        onChange={handleChange}
        isRegrex={true}
        isValid={isValidPassword}
        required={true}
        fieldType="input"
      />
      {regValues.password !== "" && !isValidPassword && (
        <ul className={styles.registerRegrexInfo}>
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
        label="Confirm Password"
        name="password2"
        type="password"
        placeholder="Re-enter password"
        value={regValues.password2}
        onChange={handleChange}
        isRegrex={true}
        isValid={isPasswordMatch}
        required={true}
        fieldType="input"
      />
      {regValues.password2 !== "" && !isPasswordMatch && (
        <div className={styles.registerRegrexInfo}>
          <p>♦️ Two password fields do not match!</p>
        </div>
      )}
      <div className={styles.registerButtonWrapper}>
        <button type="submit" className={styles.registerButton}>
          Submit
        </button>
      </div>
    </form>
  );
}
export default Register;
