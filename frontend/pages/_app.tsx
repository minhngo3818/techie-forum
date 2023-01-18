import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/layout";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../services/auth/auth-guard";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Layout>
          <React.Fragment>
            <Component {...pageProps} />
            <ToastContainer />
          </React.Fragment>
        </Layout>
      </AuthProvider>
    </>
  );
}
