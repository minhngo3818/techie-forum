import React from "react";
import Comment from "../comment/comment";
import { IComment } from "../../../../interfaces/forum/post/post";
import styles from "./CommentList.module.css";

interface CommentListType {
  threadKey: string;
  showComments: boolean;
  comments: IComment[];
}

// TODO: lazy server rendering comments, address some change
export default function CommentList(props: CommentListType) {
  return (
    <>
      {props.showComments && (
        <div className={styles.commentList}>
          {props.comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                keyId={`${props.threadKey}-cmt-${index}`}
                id={comment.id}
                thid={comment.thid}
                pcid={comment.pcid}
                author={comment.author}
                depth={comment.depth}
                images={comment.images}
                date={comment.date}
                content={comment.content}
                likes={comment.likes}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
