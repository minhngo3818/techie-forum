import Link from "next/link";
import Image from "next/image";
import PostHeaderInterface from "../../../../../interfaces/forum/post/post";
import styles from "./CommentHeader.module.css";

export interface CommentHeaderType extends PostHeaderInterface {}

export default function CommentHeader(props: CommentHeaderType) {
  return (
    <div className={styles.commentHeader}>
      <div className={styles.commentAvatar}>
        <Image
          src={props.avatar}
          alt="cmt-avatar"
          fill
          sizes="(max-width: 40px; max-height: 40px)"
        />
      </div>
      <Link
        className={styles.commentAuthor}
        href={`/user/profile/${props.authorId}`}
      >
        {props.author}
      </Link>
      <p className={styles.commentDate}>{props.date.toDateString()}</p>
    </div>
  );
}
