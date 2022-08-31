import "../styles/globals.css";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </SSRProvider>
    </>
  );
}

export default MyApp;
