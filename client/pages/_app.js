import "../styles/globals.css";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "../services/auth/AuthService";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </>
  );
}

export default MyApp;
