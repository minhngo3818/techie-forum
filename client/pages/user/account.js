import { useState, useRef, useEffect, useContext } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import ChangeEmail from "../../components/account/change-email/ChangeEmail";
import ChangePwd from "../../components/account/change-password/ChangePwd";
import DeleteAccount from "../../components/account/delete-account/DeleteAccount";
import AuthContext from "../../services/auth/AuthService";
import AuthGuard from "../../services/auth/AuthGuard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Modal } from "react-bootstrap";
import styles from "../../styles/Account.module.css";

const Account = () => {
  const { user } = useContext(AuthContext);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const emailRef = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.accountContainer}>
      <PageHeader pageName="Account" />
      <ChangeEmail userEmail={user.email} />
      <ChangePwd />
      <DeleteAccount />
    </div>
  );
};

export default AuthGuard(Account);
