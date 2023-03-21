import React from "react";
import styles from "./ThreadImage.module.css";

interface ThreadImageType {
  isEdit: boolean;
  images: string[];
}

export default function ThreadImages(props: ThreadImageType) {
  return <div className={styles.threadImagesWrapper}></div>;
}
