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
import { setLikeWorker } from "@services/forum/like/like-worker";
import { getPaginatedComments } from "@services/forum/comment/comment-service";

interface CommentType {
  keyId: string;
  comment: IComment;
}

export default function Comment(props: CommentType) {
  const { user } = useAuth();

  const [comment, setComment] = useState<IComment>(props.comment);
  const [isLiked, setIsLiked] = useState(props.comment.isLiked);
  const [likes, setLikes] = useState(props.comment.likes);
  const [isEdit, setIsEdit] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<IComment[]>([]);
  const [nextQueryId, setNextQueryId] = useState<string | undefined>();

  const handleLike = async () => {
    await setLikeWorker(comment.id, isLiked, setIsLiked, setLikes);
  };

  const handleIsEdit = () => {
    setIsEdit((isEdit) => !isEdit);
  };

  const handleIsComment = () => {
    setIsComment((isComment) => !isComment);
  };

  const fetchReplies = useCallback(async () => {
    if (!showReplies) {
      const results = await getPaginatedComments(
        comment.threadId,
        comment.id,
        comment.depth + 1,
        nextQueryId
      );
      if (results) {
        setReplies(results.comments);
        setNextQueryId(results.nextId);
      }
    }
  }, [showReplies, comment, nextQueryId]);

  const handleShowReplies = () => {
    setShowReplies((showReplies) => !showReplies);
    fetchReplies();
  };

  const handleAddReply = useCallback(
    (newComment: IComment) => {
      let newReplies = replies;
      newReplies.unshift(newComment);
      setReplies(newReplies);
      setIsComment(false);
    },
    [replies]
  );

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
          handleIsLike={{ isState: isLiked, setState: handleLike }}
          handleIsEdit={{ isState: isEdit, setState: handleIsEdit }}
          handleIsComment={{ isState: isComment, setState: handleIsComment }}
          handleShowReplies={{
            isState: showReplies,
            setState: handleShowReplies,
          }}
          numOfReplies={
            replies.length > 0 ? replies.length : comment.replyCount
          }
          numOfLikes={likes}
          isSameUser={props.comment.author.profile_name === user?.profile_name}
        />
        <CommentForm
          threadId={props.comment.threadId}
          parentId={props.comment.id}
          isComment={isComment}
          depth={props.comment.depth}
          addNewComment={handleAddReply}
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
