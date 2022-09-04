import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../services/auth/AuthService";
import PageHeader from "../components/PageHeader";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/Register.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const { register } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [isPasswordMatch, setPasswordMatch] = useState(false);
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    setPasswordMatch(signUp.password === signUp.password2);
  }, [signUp.password, signUp.password2]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isPasswordMatch) {
      register({
        username: signUp.username,
        email: signUp.email,
        password: signUp.password,
        password2: signUp.password2,
      });
    }

    // Refresh signUp state
    setSignUp({
      username: "",
      email: "",
      password: "",
      password2: ""
    })
  };

  return (
    <div className={styles.container}>
      <PageHeader pageName={"User Register"} />
      <Form
        className={styles.formContainer}
        name="login"
        onSubmit={handleSignUp}
      >
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Username</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="username"
            type="text"
            onChange={(e) => setSignUp({ username: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Email</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="email"
            type="text"
            onChange={(e) => setSignUp({ email: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Password</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="password"
            type="password"
            onChange={(e) => setSignUp({ password: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Confirm Password</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="confirmPassword"
            type="password"
            onChange={(e) => setSignUp({ password2: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.btnContainer}>
          <Button className={styles.btn} type="submit">
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
