import React, { useState, useCallback } from "react";
import CommentHeader from "./header/comment-header";
import CommentBody from "./body/comment-body";
import { IComment } from "../../../../interfaces/forum/post/post";
import styles from "./Comment.module.css";
import { EventTargetNameValue } from "../../../../interfaces/forum/form/form-field";

interface CommentType extends IComment {
  keyId: string;
  isSameUser: boolean;
}

export default function Comment(props: CommentType) {
  const [comment, setComment] = useState<IComment>({
    id: props.id,
    thid: props.thid,
    pcid: props.pcid,
    author: props.author,
    images: props.images,
    date: props.date,
    content: props.content,
    likes: props.likes,
  });

  const [isLike, setIsLike] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
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
      console.log("typing");
    },
    []
  );

  const handleSubmitContent = () => {
    console.log("Send change content request");
  };

  return (
    <div className={styles.comment} data-depth={1}>
      <CommentHeader author={props.author} date={props.date} />
      <CommentBody
        keyId={props.keyId}
        handleIsLike={{ isState: isLike, setState: handleIsLike }}
        handleIsEdit={{ isState: isEdit, setState: handleIsEdit }}
        handleIsComment={{ isState: isComment, setState: handleIsComment }}
        content={props.content}
        numOfLikes={props.likes}
        isSameUser={props.isSameUser}
        onChange={handleChangeComment}
        onSubmit={handleSubmitContent}
      />
    </div>
  );
}
