import { useState, useRef, useEffect, useContext } from "react";
import PageHeader from "../../components/PageHeader";
import AuthContext from "../../services/auth/AuthService";
import AuthGuard from "../../services/auth/AuthGuard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Modal } from "react-bootstrap";
import styles from "../../styles/Account.module.css";

const Account = () => {
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const emailRef = useRef();

  return (
    <div className={styles.accountContainer}>
      <PageHeader pageName="Account" />
      <Form className={styles.accountSection}>
        <Form.Group className={styles.accountField}>
          <Form.Label>Old email</Form.Label>
          <Form.Control ref={emailRef} placeholder="old email"></Form.Control>
        </Form.Group>
        <Form.Group className={styles.accountField}>
          <Form.Label>New email</Form.Label>
          <Form.Control ref={emailRef} placeholder="new email"></Form.Control>
        </Form.Group>
        <Form.Group className={styles.accountField}></Form.Group>
      </Form>
      <Form className={styles.accountSection}>
        <Form.Group className={styles.accountField}>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            ref={emailRef}
            placeholder="old password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.accountField}>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            ref={emailRef}
            placeholder="old password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.accountField}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            ref={emailRef}
            placeholder="Confirm password"
          ></Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AuthGuard(Account);
