import React from "react";
import Comment from "../comment";
import { IComment } from "@interfaces/forum/post/post";
import styles from "./CommentList.module.css";

interface CommentListType {
  threadKey: string;
  showComments: boolean;
  comments: IComment[];
}

export default function CommentList(props: CommentListType) {
  return (
    <>
      {props.showComments && (
        <div className={styles.CmtList}>
          {props.comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                keyId={`${props.threadKey}-cmt-${index}`}
                comment={comment}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
