import React from "react";
import Link from "next/link";
import projStyles from "../Project.module.css";
import styles from "./ProjectLink.module.css";

export default function ProjectLink(props: { name: string; link?: string }) {
  return (
    <div className={styles.projectLinkWrapper}>
      <span className={projStyles.connectLine} />
      <Link href={props.link ?? ""} className={styles.projectLink}>
        {props.name}
      </Link>
    </div>
  );
}
