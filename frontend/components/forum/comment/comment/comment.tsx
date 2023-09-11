import React, { useState, useCallback } from "react";
import CommentHeader from "./header/comment-header";
import CommentBody from "./body/comment-body";
import { IComment } from "@interfaces/forum/post/post";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";
import styles from "./Comment.module.css";
import useAuth from "@services/auth/auth-provider";

interface CommentType {
  keyId: string;
  comment: IComment;
}

export default function Comment(props: CommentType) {
  const { user } = useAuth();

  const [comment, setComment] = useState<IComment>(props.comment);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [isEdit, setIsEdit] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [numOfReplies, setNumOfReplies] = useState(0);

  const handleIsLike = () => {
    setIsLike((isLike) => !isLike);
  };

  const handleIsEdit = () => {
    setIsEdit((isEdit) => !isEdit);
  };

  const handleIsComment = () => {
    setIsComment((isComment) => !isComment);
  };

  const handleShowReplies = () => {
    setShowReplies((showReplies) => !showReplies);
  };

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
        handleShowReplies={{
          isState: showReplies,
          setState: handleShowReplies,
        }}
        content={comment.content}
        numOfReplies={numOfReplies}
        numOfLikes={likes}
        isSameUser={props.comment.author.profile_name === user?.profile_name}
        onChange={handleChangeComment}
        onSubmit={handleSubmitComment}
      />
    </div>
  );
}
