import React from "react";
import Image from "next/image";
import styles from "./ImageGallery.module.css";

interface ImgGalleryView {
  length: number;
  curImage: string;
  curIndex: number;
  setCurIndex: (value: React.SetStateAction<number>) => void;
}

export default function ImgGalleryView(props: ImgGalleryView) {
  const handleChangeImageView = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (props.length <= 1) return;

    let nextCurIndex = props.curIndex;

    if (event.currentTarget.name === "gallery-next-image") {
      nextCurIndex += 1;

      if (nextCurIndex >= props.length) nextCurIndex = 0;
    }

    if (event.currentTarget.name === "gallery-prev-image") {
      nextCurIndex -= 1;

      if (nextCurIndex < 0) nextCurIndex = props.length - 1;
    }

    props.setCurIndex(nextCurIndex);
  };

  return (
    <div aria-label="gallery-main-view" className={styles.imgGalrView}>
      <span></span>
      <button
        type="button"
        name="gallery-prev-image"
        onClick={handleChangeImageView}
      >
        Prev
      </button>
      <div className="relative flex-grow">
        <Image
          className="object-contain"
          src={props.curImage}
          alt="content-image"
          fill
          sizes="(max-width: 720px;)"
        ></Image>
      </div>
      <button
        type="button"
        name="gallery-next-image"
        onClick={handleChangeImageView}
      >
        Next
      </button>
    </div>
  );
}
