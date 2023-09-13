import { ReactNode } from "react";
import styles from "./ForumTitle.module.css";

export default function ForumTitle({ children }: { children: ReactNode }) {
  return <h2 className={styles.forumTitle}>&gt;_ {children}</h2>;
}
