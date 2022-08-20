import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navbar";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
