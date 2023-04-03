import React from "react";
import authGuard from "../../services/auth/auth-guard";
import PageTitle from "../../components/utils/page-title/page-title";
import ChangeEmail from "../../components/account/change-email/change-email";
import ChangePassword from "../../components/account/change-password/change-password";
import DeleteAccount from "../../components/account/delete-account/delete-account";
import styles from "../../styles/Account.module.css";
import useAuth from "../../services/auth/auth-provider";

function Account() {
  const { user } = useAuth();

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.accountTitleWrapper}>
        {/* Add loading bar  */}
        <div className={styles.accountTitle}>
          <PageTitle title="Account" />
        </div>
      </div>
      <div className={styles.accountSections}>
        <ChangeEmail email={user ? user.email : ""} />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
}
export default authGuard(Account);
