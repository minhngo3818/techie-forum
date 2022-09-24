import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import customBS from "../../../styles/CustomBootstrap.module.css";
import genericStyles from "../../../styles/Account.module.css";
import uniqueStyles from "./ChangePwd.module.css";

const ChangePwd = () => {
  // Password
  const pwdRef = useRef();
  const [pwdSet, setPwdSet] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  const handleChangePwd = () => {};

  // Utilities
  const [isDoChange, setIsDoChange] = useState(false);
  const handleDoChange = () => {
    if (isDoChange) {
      setIsDoChange(false);
    } else {
      setIsDoChange(true);
    }
  };

  useEffect(() => {
    if (isDoChange) {
      pwdRef.current.focus();
    }
  }, []);

  return (
    <div className={genericStyles.container}>
      <h4>User Password</h4>
      {!isDoChange ? (
        <Button className={genericStyles.btn} onClick={handleDoChange}>
          Change Password
        </Button>
      ) : (
        <Form>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              className={customBS.formControl}
              placeholder="Old password"
              value={pwdSet.old_password}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, old_password: e.target.value })
              }
              ref={pwdRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              className={customBS.formControl}
              placeholder="New password"
              value={pwdSet.new_password}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, new_password: e.target.value })
              }
              ref={pwdRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className={customBS.formControl}
              placeholder="Confirm password"
              value={pwdSet.new_password2}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, new_password2: e.target.value })
              }
              ref={pwdRef}
            ></Form.Control>
          </Form.Group>
          <Button className={customBS.btn} onClick={handleChangePwd}>
            Submit
          </Button>
          <Button className={customBS.btn} onClick={handleDoChange}>
            Cancel
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ChangePwd;
