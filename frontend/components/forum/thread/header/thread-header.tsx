import React from "react";
import Link from "next/link";
import Image from "next/image";
import IPostHeader from "@interfaces/forum/post/post";
import styles from "./ThreadHeader.module.css";

export default function ThreadHeader(props: IPostHeader) {
  const formattedName = props.author.profile_name.replace(" ", "%20");
  return (
    <div className={styles.threadHeader}>
      <Link
        className={styles.threadHeaderAvatar}
        href={`/profile/${formattedName}`}
      >
        <Image
          src={props.author.avatar}
          alt="avatar"
          fill
          sizes="(max-width: 40px)"
        />
      </Link>
      <Link
        className={styles.threadAuthorName}
        href={`/profile/${formattedName}`}
      >
        {props.author.profile_name}
      </Link>
      <p className={styles.threadHeaderDate}>
        {!props.isEdited ? "" : "(Edited) "}
        {new Date(props.date).toDateString()}
      </p>
    </div>
  );
}
