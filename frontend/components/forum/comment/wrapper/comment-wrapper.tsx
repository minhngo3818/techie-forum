import React from "react";
import styles from "./CommentWrapper.module.css";

export default function CommentWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className={styles.CmtOuterWrapper}>
      <div className={styles.CmtInnerWrapper}>{children}</div>
    </div>
  );
}
