import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import PageTitle from "../components/utils/page-title/page-title";
import BaseField from "../components/form/field-base/base-field";
import { EventTargetNameValue, FormEvent } from "../interfaces/forum/post/form-field";
import styles from "../styles/Login.module.css";

const initialState = {
  username: "",
  password: "",
};

function Login() {
  const [loginValues, setLoginValues] = useState(initialState);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setLoginValues((val) => ({ ...val, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(loginValues);
      alert("Login request was sent");
    },
    [loginValues]
  );

  return (
    <form className={styles.loginWrapper} onSubmit={handleSubmit}>
      <PageTitle title="Login" />
      <BaseField
        innerRef={usernameRef}
        label="Username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={loginValues.username}
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
        value={loginValues.password}
        onChange={handleChange}
        required={true}
        fieldType="input"
      />
      <div className={styles.loginButtonWrapper}>
        <button type="submit" className={styles.loginButton}>
          Sign-In
        </button>
        <Link href="/register" className={styles.loginButton}>
          Register
        </Link>
        <Link href="/forgot-password" className={styles.loginLink}>
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default Login;
