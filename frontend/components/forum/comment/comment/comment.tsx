import { useState, useRef, useCallback } from "react";
import CommentHeader, { CommentHeaderType } from "./header/comment-header";
import CommentBody, { CommentBodyType } from "./body/comment-body";
import CommentUserInterface from "../../../../interfaces/comment-user";
import styles from "./Comment.module.css";
import { EventTargetNameValue } from "../../../../interfaces/form-field";

interface CommentType extends CommentUserInterface {
  keyId: string;
}

export default function Comment(props: CommentType) {
  const [comment, setComment] = useState<CommentUserInterface>({
    author: props.author,
    authorId: props.authorId,
    avatar: props.avatar,
    images: props.images,
    date: props.date,
    content: props.content,
    numOfLikes: props.numOfLikes,
  });

  const [isLike, setIsLike] = useState(false);
  const [isMemorize, setIsMemorize] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const handleIsLike = useCallback(() => {
    setIsLike((isLike) => !isLike);
  }, []);

  const handleIsMemorize = useCallback(() => {
    setIsMemorize((isMemorize) => !isMemorize);
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
    <div className={styles.comment}>
      <CommentHeader
        author={props.author}
        authorId={props.authorId}
        avatar={props.avatar}
        date={props.date}
      />
      <CommentBody
        keyId={props.keyId}
        handleIsLike={{ isState: isLike, setState: handleIsLike }}
        handleIsMemorized={{ isState: isMemorize, setState: handleIsMemorize }}
        handleIsEdit={{ isState: isEdit, setState: handleIsEdit }}
        handleIsComment={{ isState: isComment, setState: handleIsComment }}
        content={props.content}
        stat={props.numOfLikes}
        onChange={handleChangeComment}
        onSubmit={handleSubmitContent}
      />
    </div>
  );
}
