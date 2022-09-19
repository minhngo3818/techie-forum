import Head from "next/head";
import PageHeader from "../components/PageHeader";
import AuthContext from "../services/auth/AuthService";
import { useContext } from "react";
import styles from "../styles/Home.module.css";
import About from "../components/about/About";
import Footer from "../components/footer/Footer";

const Home = () => {
  let { auth } = useContext(AuthContext);
  return (
    <div>
      <Head>
        <title>Techies</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className={styles.container}>
        <PageHeader pageName="Homepage" />;
        {auth ? (
          <h1 className={styles.authorized}>Authorized</h1>
        ) : (
          <h1 className={styles.notAuthorized}>Not Authorized</h1>
        )}
      </div>
      <About />
      <Footer />
    </div>
  );
};

export default Home;
