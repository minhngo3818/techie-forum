import React, { useState } from "react";
import Image from "next/image";
import ImageGallery from "../image-gallery/image-gallery";
import styles from "./ImageList.module.css";

interface SingleImage {
  image: string;
  isLast?: boolean;
  remains?: number;
  onOpenGallery: () => void;
}

function SingleImage(props: SingleImage) {
  /**
   * Styling
   *
   * Instead of placing in css module,
   * write directly in functional component
   * to make the code more intach with group
   * attribute of Tailwind
   */
  let imgListBtn = `
    group relative flex justify-center 
    items-center min-h-[120px]
    border border-gray hover:border-white
    duration-200
    w-full h-full `;

  let imgListBtnOverlay = `
    absolute flex w-full h-full 
    duration-200 z-10
    group-hover:border-white 
    group-hover:bg-black 
    group-hover:opacity-60 
    group-active:bg-gray`;
  imgListBtnOverlay += props.isLast ? ` bg-gray opacity-30` : "";

  let imgListBtnLabel = `
  text-lg font-medium z-30
  text-lg font-medium z-30
  group-hover:text-white`;
  let imgListBtnView = imgListBtnLabel + " hidden group-hover:block";
  let imgListBtnRemains = imgListBtnLabel + " text-white group-hover:hidden";

  return (
    <button className={imgListBtn} onClick={props.onOpenGallery}>
      <span className={imgListBtnOverlay}></span>
      <p className={imgListBtnView}>View</p>
      {props.isLast && <p className={imgListBtnRemains}>+{props.remains}</p>}
      <Image
        className="object-contain z-0"
        src={props.image.valueOf()}
        alt="content-image"
        fill
        sizes="(max-width: 720px;) 100vw"
      ></Image>
    </button>
  );
}

interface Images {
  images: string[];
  handleOpenGallery: (index: number) => void;
}

function Images(props: Images) {
  let itemStyle = styles.imgListItem;
  let quantity = props.images.length;
  if (quantity === 1) itemStyle = styles.imgListSingleItem;
  if (quantity >= 5) itemStyle = styles.imgListItemNoSpan;

  return (
    <React.Fragment>
      {props.images.slice(0, 5).map((image, index) => {
        if (index === 0 && (quantity === 3 || quantity >= 5)) {
          return (
            <li key={index} className={styles.imgListFirstItem}>
              <SingleImage
                image={image}
                onOpenGallery={() => props.handleOpenGallery(index)}
              />
            </li>
          );
        }

        if (index === 4 && quantity > 5)
          return (
            <li key={index}>
              <SingleImage
                image={image}
                onOpenGallery={() => props.handleOpenGallery(index)}
                isLast={true}
                remains={quantity - 5}
              />
            </li>
          );

        return (
          <li key={index} className={itemStyle}>
            <SingleImage
              image={image}
              onOpenGallery={() => props.handleOpenGallery(index)}
            />
          </li>
        );
      })}
    </React.Fragment>
  );
}

export default function ImageList(props: { images?: string[] | FileList }) {
  if (props.images?.length == 0) return null;
  let images = props.images as string[];

  const [openGallery, setOpenGallery] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpenGallery = (curIndex: number) => {
    setOpenGallery((openGallery) => !openGallery);
    setIndex(curIndex);
  };

  return (
    <div className={styles.imgListContainer}>
      <div className={styles.imgListWrapper}>
        <ul className={styles.imgListManyContainer}>
          <Images images={images} handleOpenGallery={handleOpenGallery} />
        </ul>
      </div>
      <span className={styles.imgListOverlay}></span>
      <ImageGallery
        isOpen={openGallery}
        onClose={() => setOpenGallery(false)}
        index={index}
        images={images}
      />
    </div>
  );
}
