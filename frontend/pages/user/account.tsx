import PageTitle from "../../components/utils/page-title/page-title";
import ChangeEmail from "../../components/account/change-email/change-email";
import ChangePassword from "../../components/account/change-password/change-password";
import DeleteAccount from "../../components/account/delete-account/delete-account";
import styles from "../../styles/Account.module.css";

function Account() {
  // Data retrieval
  const User = {
    email: "jotarokujo@gmail.com",
  };

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.accountTitleWrapper}>
        {/* Add loading bar  */}
        <div className={styles.accountTitle}>
          <PageTitle title="Account" />
        </div>
      </div>
      <div className={styles.accountSections}>
        <ChangeEmail email={User.email} />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
}
export default Account;

{
}
