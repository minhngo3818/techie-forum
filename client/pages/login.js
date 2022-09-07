import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import styles from "../styles/Login.module.css";
import customBS from "../styles/CustomBootstrap.module.css";
import AuthContext from "../services/auth/AuthService";
import { useState, useContext } from "react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className={styles.container}>
      <PageHeader pageName="Login" />
      <Form className={styles.formContainer} onSubmit={handleLogin}>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Username</Form.Label>
          <Form.Control
            className={customBS.formControl}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Password</Form.Label>
          <Form.Control
            className={customBS.formControl}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Button className={customBS.btn} type="submit">
            Sign-in
          </Button>
          <Link href={`/register`}>
            <Button className={customBS.btn} as="a">
              Register
            </Button>
          </Link>
          <Link href={`/forgotPassword`}>
            <a className={styles.link}>Forgot password</a>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
