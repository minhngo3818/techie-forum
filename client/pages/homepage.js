import PageHeader from "../components/PageHeader";
import AuthContext from "../services/auth/AuthService";
import { useContext } from "react";
import styles from "../styles/Home.module.css";

const Home = () => {
  let { isAuth } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <PageHeader pageName="Homepage" />;
      {isAuth ? (
        <h1 className={styles.authorized}>Authorized</h1>
      ) : (
        <h1 className={styles.notAuthorized}>Not Authorized</h1>
      )}
    </div>
  );
};

export default Home;
