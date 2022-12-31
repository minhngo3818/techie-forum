import React from "react";
import projStyles from "../Project.module.css";
import styles from "./ProjectSummary.module.css";

export default function ProjectSummary(prop: { summary: string }) {
  return (
    <React.Fragment>
      <span className={projStyles.connectLine}></span>
      <p className={styles.projectSummary}>{prop.summary}</p>
    </React.Fragment>
  );
}
