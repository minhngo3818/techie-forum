import PageHeader from "../../components/PageHeader";
import AuthGuard from "../../services/auth/AuthGuard";

const Account = () => {
  return (
    <>
      <PageHeader pageName="Account" />
    </>
  );
};

export default AuthGuard(Account);
