import Link from "next/link";
import Image from "next/image";
import PostHeaderInterface from "../../../../interfaces/forum/post/post";
import styles from "./ThreadHeader.module.css";

interface ThreadHeaderType extends PostHeaderInterface {}

export default function ThreadHeader(props: ThreadHeaderType) {
  return (
    <div className={styles.threadHeader}>
      <div className={styles.threadHeaderAvatar}>
        <Image
          src={props.avatar || ""}
          alt="avatar"
          fill
          sizes="(max-width: 40px)"
        />
      </div>
      <Link
        className={styles.threadAuthor}
        as="a"
        href={`/user/profile/[${props.authorId}]`}
      >
        {props.author}
      </Link>
      <p className={styles.threadHeaderDate}>
        {props.date?.toDateString() || ""}
      </p>
    </div>
  );
}
