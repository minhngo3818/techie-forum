import AuthGuard from "../../services/auth/AuthGuard";
import PageHeader from "../../components/PageHeader";

const Settings = () => {
  return (
    <>
      <PageHeader pageName="Settings" />
    </>
  );
};

export default AuthGuard(Settings);
