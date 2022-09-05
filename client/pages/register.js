import { useState, useEffect, useReducer, useContext } from "react";
import AuthContext from "../services/auth/AuthService";
import PageHeader from "../components/PageHeader";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Register.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,30}$/;

function selectValidIcon(state, action) {}

const Register = () => {
  const { register } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  // Validation states
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    setIsValidName(USER_REGEX.test(signUp.username));
  }, [signUp.username]);

  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(signUp.password));
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
    setSuccess(true);
    // Refresh signUp state
    setSignUp({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
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
          <Form.Label className={styles.label}>
            Username
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={isValidName ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={
                isValidName || !signUp.username ? styles.hide : styles.invalid
              }
            />
          </Form.Label>
          <Form.Control
            className={styles.formControl}
            name="username"
            type="text"
            onChange={(e) => setSignUp({ ...signUp, username: e.target.value })}
            required
          ></Form.Control>
          <p
            className={
              isValidName || !signUp.username ? styles.hide : styles.invalidNote
            }
          >
            Username must contain 4 to 24 characters
            <br />
            Must start with a letter
            <br />
            Special characters are not allowed except hypen and underscore
          </p>
        </Form.Group>

        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Email</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="email"
            type="text"
            onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>
            Password
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={isValidPassword ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={
                isValidPassword || !signUp.password
                  ? styles.hide
                  : styles.invalid
              }
            />
          </Form.Label>
          <Form.Control
            className={styles.formControl}
            name="password"
            type="password"
            onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
            required
          ></Form.Control>
          <p
            className={
              isValidPassword || !signUp.password
                ? styles.hide
                : styles.invalidNote
            }
          >
            Password must contain at least 8 characters
            <br />
            Include upper & lowercase letters, a number & a special character.
            <br />
            Allowed special characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </Form.Group>

        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>
            Confirm Password
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={
                isPasswordMatch && signUp.password2 ? styles.valid : styles.hide
              }
            />
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={
                isPasswordMatch || !signUp.password2
                  ? styles.hide
                  : styles.invalid
              }
            />
          </Form.Label>
          <Form.Control
            className={styles.formControl}
            name="confirmPassword"
            type="password"
            onChange={(e) =>
              setSignUp({ ...signUp, password2: e.target.value })
            }
            required
          ></Form.Control>
          <p
            className={
              isPasswordMatch || !signUp.password2
                ? styles.hide
                : styles.invalidNote
            }
          >
            Two password fields don't match!
          </p>
        </Form.Group>

        <Form.Group className={styles.btnContainer}>
          <Button className={styles.btn} type="submit">
            Sign-Up
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
