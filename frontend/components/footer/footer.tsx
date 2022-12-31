import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Ⓒ 2022 created by{" "}
        <a className={styles.footerLink} href="https://github.com/minhngo3818">
          Tuyen Ngo
        </a>
      </p>
      <p className={styles.footerText}>Powered by React - Next JS - Django</p>
    </footer>
  );
}
