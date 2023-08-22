import React from "react";
import Link from "next/link";
import Image from "next/image";
import IPostHeader from "../../../../interfaces/forum/post/post";
import styles from "./ThreadHeader.module.css";

export default function ThreadHeader(props: IPostHeader) {
  return (
    <div className={styles.threadHeader}>
      <div className={styles.threadHeaderAvatar}>
        <Image
          src={props.author.avatar}
          alt="avatar"
          fill
          sizes="(max-width: 40px)"
        />
      </div>
      <Link
        className={styles.threadAuthor}
        as="a"
        href={`/user/profile/[${props.author.id}]`}
      >
        {props.author.profile_name}
      </Link>
      <p className={styles.threadHeaderDate}>{props.date.toDateString()}</p>
    </div>
  );
}
