import { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import customBS from "../../../styles/CustomBootstrap.module.css";
import genericStyles from "../../../styles/Account.module.css";
import uniqueStyles from "./ChangeEmail.module.css";

const ChangeEmail = (props) => {
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const emailRef = useRef();
  const [email, setEmail] = useState(null);

  const handleIsChangeEmail = () => {
    if (isChangeEmail) {
      setIsChangeEmail(false);
    } else {
      setIsChangeEmail(true);
    }
  };

  useEffect(() => {
    if (isChangeEmail) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className={genericStyles.container}>
      <h4>User Email</h4>
      {!isChangeEmail ? (
        <span>
          <p id={uniqueStyles.userEmail}>{props.userEmail}</p>
          <Button
            type="button"
            className={genericStyles.btn}
            onClick={handleIsChangeEmail}
          >
            Change Email
          </Button>
        </span>
      ) : (
        <Form className={genericStyles.accountSection}>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label id={uniqueStyles.userEmail}>
              {props.userEmail}
            </Form.Label>
          </Form.Group>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label>New email</Form.Label>
            <Form.Control
              className={customBS.formControl}
              ref={emailRef}
              placeholder="new email"
            ></Form.Control>
          </Form.Group>
          <Form.Group className={genericStyles.accountField}>
            <Button className={customBS.btn} type="submit">
              Save Change
            </Button>
            <Button
              className={customBS.btn}
              type="button"
              onClick={handleIsChangeEmail}
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default ChangeEmail;

ChangeEmail.propTypes = {
  userEmail: PropTypes.string,
};
