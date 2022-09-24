import { useState, useEffect, useRef, useContext } from "react";
import AuthGuard from "../../../services/auth/AuthGuard";
import AuthContext from "../../../services/auth/AuthService";
import { Form, Button } from "react-bootstrap";
import customBS from "../../../styles/CustomBootstrap.module.css";
import genericStyles from "../../../styles/Account.module.css";
import uniqueStyles from "./ChangePwd.module.css";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,30}$/;

const ChangePwd = () => {
  // Context
  const { changePassword } = useContext(AuthContext);

  // Password State
  const pwdRef = useRef();
  const [pwdSet, setPwdSet] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setPasswordMatch] = useState(false);

  // Edit password state
  const [isDoChange, setIsDoChange] = useState(false);

  // Password validation
  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(pwdSet.new_password));
    setPasswordMatch(pwdSet.new_password === pwdSet.new_password2);
  }, [pwdSet.password, pwdSet.password2]);

  const handleChangePwd = async (e) => {
    e.preventDefault();
    if (isPasswordMatch && isValidPassword) {
      changePassword(pwdSet);

      // Refresh state data
      setPwdSet({
        old_password: "",
        new_password: "",
        new_password2: "",
      });

      // Exit edit mode
      setIsDoChange(false);
    }
  };

  // Utilities
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
              as="input"
              className={customBS.formControl}
              placeholder="Old password"
              value={pwdSet.old_password}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, old_password: e.target.value })
              }
              ref={pwdRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              as="input"
              className={customBS.formControl}
              placeholder="New password"
              value={pwdSet.new_password}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, new_password: e.target.value })
              }
              ref={pwdRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className={genericStyles.accountField}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              as="input"
              className={customBS.formControl}
              placeholder="Confirm password"
              value={pwdSet.new_password2}
              onChange={(e) =>
                setPwdSet({ ...pwdSet, new_password2: e.target.value })
              }
              ref={pwdRef}
              required
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

export default AuthGuard(ChangePwd);
