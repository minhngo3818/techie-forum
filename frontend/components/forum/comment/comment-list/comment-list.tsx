import React from "react";
import Comment from "../comment/comment";
import CommentUserInterface from "../../../../interfaces/comment-user";
import styles from "./CommentList.module.css";

interface CommentListType {
  threadKey: string;
  showComments: boolean;
  comments: CommentUserInterface[];
}

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
                author={comment.author}
                authorId={comment.authorId}
                avatar={comment.avatar}
                images={comment.images}
                date={comment.date}
                content={comment.content}
                numOfLikes={comment.numOfLikes}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
