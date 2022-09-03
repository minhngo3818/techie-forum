import "../styles/globals.css";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "../services/auth/AuthService";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
