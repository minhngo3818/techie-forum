import React from "react";
import Image from "next/image";
import styles from "./ThreadImage.module.css";

interface ThreadImageType {
  images?: string[] | FileList;
}

export default function ThreadImages(props: ThreadImageType) {
  if (Array.isArray(props.images)) {
    return (
      <div className={styles.threadImages}>
        {props.images?.map((image, index) => {
          return (
            <div key={index} className={styles.threadImage}>
              <Image
                src={image as string}
                alt="content-image"
                fill
                sizes="(max-width: 720px) 100vw"
              />
            </div>
          );
        })}
      </div>
    );
  }

  return <></>;
}
