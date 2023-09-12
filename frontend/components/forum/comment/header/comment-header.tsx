import React from "react";
import Link from "next/link";
import Image from "next/image";
import IPostHeader from "@interfaces/forum/post/post";
import styles from "./CommentHeader.module.css";

export default function CommentHeader(props: IPostHeader) {
  return (
    <div className={styles.CmtHeader}>
      <div className={styles.CmtAvatar}>
        <Image
          src={props.author.avatar}
          alt="cmt-avatar"
          fill
          sizes="(max-width: 40px; max-height: 40px)"
        />
      </div>
      <Link
        className={styles.CmtAuthor}
        href={`/user/profile/${props.author.id}`}
      >
        {props.author.profile_name}
      </Link>
      <p className={styles.CmtDate}>
        {!props.isEdited ? "" : "(Edited) "}
        {new Date(props.date).toDateString()}
      </p>
    </div>
  );
}
