import PageHeader from "../components/PageHeader";
import AuthContext from "../services/auth/AuthService";
import { useContext } from "react";

const Home = () => {
  let { isAuth } = useContext(AuthContext);
  return (
    <>
      <PageHeader pageName="Homepage" />;
      {isAuth ? <h1>Authorized</h1> : <h1>Not Authorized</h1>}
    </>
  );
};

export default Home;
