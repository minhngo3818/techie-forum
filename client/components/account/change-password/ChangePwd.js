import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
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

  useEffect(() => {
    pwdRef.current.focus();
  }, []);

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

  return (
    <div className={genericStyles.container}>
      <Button onClick={handleDoChange}>Change Password</Button>
      {isDoChange && (
        <Form>
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              placeholder="old password"
              value={pwdSet.old_password}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, old_password: e.target.value })
              }
              ref={pwdRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              placeholder="New password"
              value={pwdSet.new_password}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, new_password: e.target.value })
              }
              ref={pwdRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="Confirm password"
              value={pwdSet.new_password2}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, new_password2: e.target.value })
              }
              ref={pwdRef}
            ></Form.Control>
          </Form.Group>
          <Button onClick={handleChangePwd}>Submit</Button>
          <Button onClick={handleDoChange}>Cancel</Button>
        </Form>
      )}
    </div>
  );
};

export default ChangePwd;
