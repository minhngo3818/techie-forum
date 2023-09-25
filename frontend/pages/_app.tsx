import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "@components/layout/layout";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@services/auth/auth-provider";
import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>
            <React.Fragment>
              <Component {...pageProps} />
              <ToastContainer />
            </React.Fragment>
          </Layout>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
