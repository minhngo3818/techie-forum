import React from "react";
import {
  ThumbUpOutline,
  ThumbUp,
  CheckBoxOutline,
  CheckBox,
  Edit,
  EditOutline,
  CommentOutline,
  Comment,
  Reply,
  ReplyOutline,
  PostThread,
  PostThreadOutline,
  MarkedList,
  MarkedListOutline,
  Search,
} from "@components/icons/icons";
import styles from "./IconButton.module.css";

interface IconType {
  name: string;
  fill: JSX.Element;
  outline: JSX.Element;
}

export const iconList: IconType[] = [
  {
    name: "thumbsup",
    fill: <ThumbUp className={styles.forumIcon} />,
    outline: <ThumbUpOutline className={styles.forumIcon} />,
  },
  {
    name: "marked",
    fill: <CheckBox className={styles.forumIcon} />,
    outline: <CheckBoxOutline className={styles.forumIcon} />,
  },
  {
    name: "edit",
    fill: <Edit className={styles.forumIcon} />,
    outline: <EditOutline className={styles.forumIcon} />,
  },
  {
    name: "comment",
    fill: <Comment className={styles.forumIcon} />,
    outline: <CommentOutline className={styles.forumIcon} />,
  },
  {
    name: "reply",
    fill: <Reply className={styles.forumIcon} />,
    outline: <ReplyOutline className={styles.forumIcon} />,
  },
  {
    name: "post-thread",
    fill: <PostThread className={styles.forumIcon} />,
    outline: <PostThreadOutline className={styles.forumIcon} />,
  },
  {
    name: "marked-list",
    fill: <MarkedList className={styles.forumIcon} />,
    outline: <MarkedListOutline className={styles.forumIcon} />,
  },
  {
    name: "search",
    fill: <Search className={styles.forumIcon} />,
    outline: <Search className={styles.forumIcon} />,
  },
];
