import React from "react";
import styles from "./ForumContainer.module.css";

export default function ForumContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <div className={styles.forumContainer}>{children}</div>;
}
