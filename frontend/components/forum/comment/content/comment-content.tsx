import React from "react";
import styles from "./CommentContent.module.css";

export default function CommentContent(props: { content: string }) {
  return <p className={styles.CmtContent}>{props.content}</p>;
}
