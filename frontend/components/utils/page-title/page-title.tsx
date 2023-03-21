import React from "react";
import styles from "./PageTitle.module.css";

interface PageTitleType {
  title: string;
}

function PageTitle(props: PageTitleType) {
  return (
    <div className={styles.pageTitleWrapper}>
      <h3 className={styles.pageTitleText}>{props.title}</h3>
    </div>
  );
}
export default PageTitle;
