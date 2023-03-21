import React from "react";
import styles from "./ProjectTitle.module.css";

export default function ProjectTitle(prop: { title: string }) {
  return (
    <div className={styles.projectTitleWrapper}>
      <h3 className={styles.projectTitle}>{prop.title}</h3>
    </div>
  );
}
