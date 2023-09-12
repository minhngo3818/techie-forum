import React, { useState, useCallback } from "react";
import CommentHeader from "./header/comment-header";
import { IComment } from "@interfaces/forum/post/post";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";
import styles from "./Comment.module.css";
import useAuth from "@services/auth/auth-provider";
import CommentForm from "@components/form/form-comment/comment-form";
import CommentWrapper from "./wrapper/comment-wrapper";
import CommentContent from "./content/comment-content";
import CommentLeftButtons from "./buttons/cmt-left-buttons";
import CommentList from "./list/comment-list";

interface CommentType {
  keyId: string;
  comment: IComment;
}

export default function Comment(props: CommentType) {
  const { user } = useAuth();

  const [comment, setComment] = useState<IComment>(props.comment);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(10);
  const [isEdit, setIsEdit] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<IComment[]>([]);
  const [numOfReplies, setNumOfReplies] = useState(10);

  const handleIsLike = () => {
    setIsLike((isLike) => !isLike);
  };

  const handleIsEdit = () => {
    setIsEdit((isEdit) => !isEdit);
  };

  const handleIsComment = () => {
    setIsComment((isComment) => !isComment);
  };

  const handleChangeComment = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setComment((comment) => ({ ...comment, [name]: value }));
    },
    []
  );

  const handleAddComment = useCallback(() => {}, [replies]);

  // TODO: Consider using a worker
  const fetchReplies = useCallback(() => {}, [replies, showReplies]);

  const handleShowReplies = () => {
    setShowReplies((showReplies) => !showReplies);
  };

  const handlePostComment = () => {
    console.log("Send change content request");
  };

  return (
    <div className={styles.comment} data-depth={1}>
      <CommentHeader
        author={comment.author}
        isEdited={comment.isEdited}
        date={comment.date}
      />
      <CommentWrapper>
        <CommentContent content={comment.content} />
        <CommentLeftButtons
          keyId={props.keyId}
          handleIsLike={{ isState: isLike, setState: handleIsLike }}
          handleIsEdit={{ isState: isEdit, setState: handleIsEdit }}
          handleIsComment={{ isState: isComment, setState: handleIsComment }}
          handleShowReplies={{
            isState: showReplies,
            setState: handleShowReplies,
          }}
          numOfReplies={numOfReplies}
          numOfLikes={likes}
          isSameUser={props.comment.author.profile_name === user?.profile_name}
        />
        <CommentForm
          threadId={props.comment.threadId}
          isComment={isComment}
          addNewComment={handleAddComment}
        />
        <CommentList
          threadKey={props.comment.threadId}
          showComments={showReplies}
          comments={replies}
        />
      </CommentWrapper>
    </div>
  );
}
