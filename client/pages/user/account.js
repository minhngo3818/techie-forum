import { useState, useRef, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import PageHeader from "../../components/page-header/PageHeader";
const ChangeEmail = dynamic(() =>
  import("../../components/account/change-email/ChangeEmail")
);
const ChangePwd = dynamic(() =>
  import("../../components/account/change-password/ChangePwd")
);
const DeleteAccount = dynamic(() =>
  import("../../components/account/delete-account/DeleteAccount")
);
import AuthContext from "../../services/auth/AuthService";
import AuthGuard from "../../services/auth/AuthGuard";
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
