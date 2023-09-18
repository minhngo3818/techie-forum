import React, { useState } from "react";
import ImgGalleryHeader from "./img-gallery-header";
import ImgGalleryView from "./img-gallery-view";
import ImgGallerySlider from "./img-gallery-slider";
import styles from "./ImageGallery.module.css";

interface ImageGallery {
  isOpen: boolean;
  onClose: () => void;
  index: number;
  images: string[];
}

export default function ImageGallery(props: ImageGallery) {
  const [curIndex, setCurIndex] = useState(props.index);

  const handleSelectThumbnail = (event: React.MouseEvent<HTMLLIElement>) => {
    let selectedIndex = event.currentTarget.getAttribute("data-key");
    if (selectedIndex) {
      setCurIndex(parseInt(selectedIndex));
    }
  };

  if (!props.isOpen) return null;

  return (
    <div className={styles.imgGalrContainer}>
      <ImgGalleryHeader onClose={props.onClose} />
      <ImgGalleryView
        length={props.images.length}
        curImage={props.images[curIndex]}
        curIndex={curIndex}
        setCurIndex={setCurIndex}
      />
      <ImgGallerySlider
        images={props.images}
        curIndex={curIndex}
        onSelect={handleSelectThumbnail}
      />
    </div>
  );
}
