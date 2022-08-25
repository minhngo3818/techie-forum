import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }: AppProps) {
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
