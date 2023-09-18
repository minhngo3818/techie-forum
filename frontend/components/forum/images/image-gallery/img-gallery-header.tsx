import React from "react";
import styles from "./ImageGallery.module.css";

export default function ImgGalleryHeader(props: { onClose: () => void }) {
  return (
    <div className={styles.imgGalrHeader}>
      <button name="gallery-close-view" type="button" onClick={props.onClose}>
        Close
      </button>
    </div>
  );
}
