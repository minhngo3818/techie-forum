import React, { useState, useCallback } from "react";
import CommentHeader from "./header/comment-header";
import CommentBody from "./body/comment-body";
import { IComment } from "@interfaces/forum/post/post";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";
import styles from "./Comment.module.css";

interface CommentType {
  keyId: string;
  isSameUser: boolean;
  comment: IComment;
}

export default function Comment(props: CommentType) {
  const [comment, setComment] = useState<IComment>(props.comment);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [isEdit, setIsEdit] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const handleIsLike = useCallback(() => {
    setIsLike((isLike) => !isLike);
  }, []);

  const handleIsEdit = useCallback(() => {
    setIsEdit((isEdit) => !isEdit);
  }, []);

  const handleIsComment = useCallback(() => {
    setIsComment((isComment) => !isComment);
  }, []);

  const handleChangeComment = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setComment((comment) => ({ ...comment, [name]: value }));
    },
    []
  );

  const handleSubmitComment = () => {
    console.log("Send change content request");
  };

  return (
    <div className={styles.comment} data-depth={1}>
      <CommentHeader
        author={comment.author}
        isEdited={comment.isEdited}
        date={comment.date}
      />
      <CommentBody
        keyId={props.keyId}
        handleIsLike={{ isState: isLike, setState: handleIsLike }}
        handleIsEdit={{ isState: isEdit, setState: handleIsEdit }}
        handleIsComment={{ isState: isComment, setState: handleIsComment }}
        content={comment.content}
        numOfLikes={likes}
        isSameUser={props.isSameUser}
        onChange={handleChangeComment}
        onSubmit={handleSubmitComment}
      />
    </div>
  );
}
