import React from "react";
import styles from "./ForumToolbar.module.css";

export default function ForumToolbar({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <div className={styles.forumToolbar}>{children}</div>;
}
