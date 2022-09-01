import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import styles from "../styles/Login.module.css";


const Login = () => {
  return (
    <div className={styles.container}>
      <PageHeader pageName="Login Page" />
      <Form className={styles.formContainer}>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Username</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="username"
            type="text"
            placeholder="Enter username"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Password</Form.Label>
          <Form.Control
            className={styles.formControl}
            name="password"
            type="password"
            placeholder="Enter password"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Button className={styles.btn} type="submit">
            Login
          </Button>
          <Link href={`/register`}>
            <Button className={styles.btn} as="a">
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