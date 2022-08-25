import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import PageHeader from "../components/pageHeader";
import styles from "../styles/Login.module.css";

const Login = () => {
  return (
    <>
      <PageHeader pageName="Login Page" />
      <Form className={styles.container}>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username"></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
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
    </>
  );
};

export default Login;
