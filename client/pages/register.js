import { Form, Button } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import Link from "next/link";
import styles from "../styles/Register.module.css";

const Register = () => {
  return (
    <div className={styles.container}>
      <PageHeader pageName={"User Register"} />
      <Form className={styles.formContainer} name="login">
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Username</Form.Label>
          <Form.Control
            className={styles.formControl}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Email</Form.Label>
          <Form.Control
            className={styles.formControl}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Password</Form.Label>
          <Form.Control
            className={styles.formControl}
            type="password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label className={styles.label}>Confirm Password</Form.Label>
          <Form.Control
            className={styles.formControl}
            type="password"
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
