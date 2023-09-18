import React, { useRef } from "react";
import Image from "next/image";
import { ArrowForward, ArrowBack } from "@components/icons/icons";
import styles from "./ImageGallery.module.css";

interface ImgGallerySlider {
  images: string[];
  curIndex: number;
  onSelect: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export default function ImgGallerySlider(props: ImgGallerySlider) {
  const SliderRef = useRef<HTMLUListElement>(null);

  const SliceBack = () => {
    if (SliderRef.current) {
      SliderRef.current.scrollLeft -= 200;
    }
  };

  const SliceForward = () => {
    if (SliderRef.current) {
      SliderRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className={styles.imgGalrThumbnails}>
      <button name="gallery-slice-back" onClick={SliceBack}>
        <ArrowBack />
      </button>
      <ul id="gallery-slider" ref={SliderRef}>
        {props.images.map((image, index) => {
          return (
            <li
              data-key={index}
              className={`${
                props.curIndex === index ? "border-white" : "border-black"
              }`}
              onClick={props.onSelect}
            >
              <Image
                className="object-contain px-2 py-1"
                src={image}
                alt="content-image"
                fill
                quality={20}
                sizes="(max-width: 720px;) 100vw"
              ></Image>
            </li>
          );
        })}
      </ul>
      <button name="gallery-slice-foward" onClick={SliceForward}>
        <ArrowForward />
      </button>
    </div>
  );
}
