import PageHeader from "../../components/PageHeader";
import AuthGuard from "../../services/auth/AuthGuard";

const UserDashboard = () => {
  return (
    <>
      <PageHeader pageName="Dashboard" />
    </>
  );
};

export default AuthGuard(UserDashboard);
