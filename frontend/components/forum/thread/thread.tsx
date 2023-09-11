import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import ThreadHeader from "./header/thread-header";
import ThreadContent from "./content/content";
import ThreadButtons from "./buttons/thread-buttons";
import ThreadTags from "./tags/thread-tag";
import ThreadImages from "./images/images";
const CommentList = dynamic(
  () => import("../comment/comment-list/comment-list")
);
import CommentForm from "../../form/form-comment/comment-form";
import { getPaginatedComments } from "@services/forum/comment/comment-service";
import { IThread, IThreadBody, IComment } from "@interfaces/forum/post/post";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";
import styles from "./Thread.module.css";
import useAuth from "@services/auth/auth-provider";
import { likePost, unlikePost } from "@services/forum/like/like-service";
import { markThread, unmarkThread } from "@services/forum/mark/mark-service";

interface ThreadType {
  keyId: number;
  thread: IThread;
}

export default function Thread(props: ThreadType) {
  const { user } = useAuth();

  const [thread, setThread] = useState<IThreadBody>({
    category: props.thread.category,
    title: props.thread.title,
    content: props.thread.content,
    tags: props.thread.tags,
    images: props.thread.images,
  });
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [nextQueryId, setNextQueryId] = useState<string | undefined>();
  const [isLike, setIsLike] = useState(props.thread.isLiked);
  const [like, setLike] = useState(props.thread.likes);
  const [isMarked, setIsMarked] = useState(props.thread.isMarked);
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentForm, setIsCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = useCallback(async () => {
    if (showComments) {
      setCommentList([]);
      setNextQueryId(undefined);
    } else {
      const results = await getPaginatedComments(
        props.thread.id,
        undefined,
        nextQueryId
      );
      if (results) {
        setCommentList(results.comments);
        setNextQueryId(results.nextId);
      }
    }
  }, [commentList, showComments]);

  const handleShowComments = () => {
    setShowComments((showComments) => !showComments);
    fetchComments();
  };

  const handleLike = async () => {
    try {
      if (!isLike) {
        await likePost(props.thread.id);
        setLike((like) => like + 1);
      } else {
        await unlikePost(props.thread.id);
        setLike((like) => (like === 0 ? 0 : like - 1));
      }
      setIsLike((isLike) => !isLike);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsMarked = async () => {
    try {
      if (!isMarked) {
        await markThread(props.thread.id);
      } else {
        await unmarkThread(props.thread.id);
      }
      setIsMarked((isMarked) => !isMarked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsEdit = () => {
    // Call api to update data
    setIsEdit((isEdit) => !isEdit);
  };

  const addNewComment = (newComment: IComment) => {
    let newCommentList = [...commentList, newComment];
    setCommentList(newCommentList);
  };

  const handleIsCommentForm = () => {
    // Call api to update data
    setIsCommentForm((isComment) => !isComment);
  };

  // Thread
  const handleThreadChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setThread((thread) => ({ ...thread, [name]: value }));
    },
    [thread]
  );

  const handleUpdateThread = () => {};

  return (
    <div className={styles.thread}>
      <ThreadHeader
        author={props.thread.author}
        isEdited={props.thread.isEdited}
        date={props.thread.date}
      />
      <ThreadContent
        isEdit={isEdit}
        title={props.thread.title}
        content={props.thread.content}
        onChange={handleThreadChange}
      />
      <ThreadImages images={props.thread.images} />
      <ThreadTags
        isEdit={isEdit}
        tags={props.thread.tags}
        setThread={setThread}
      />
      <ThreadButtons
        keyId={`thr-${props.keyId}`}
        isSameUser={props.thread.author.profile_name === user?.profile_name}
        numOfLikes={like}
        handleIsLike={{ isState: isLike, setState: handleLike }}
        handleIsMarked={{
          isState: isMarked,
          setState: handleIsMarked,
        }}
        handleIsEdit={{ isState: isEdit, setState: handleIsEdit }}
        handleIsComment={{
          isState: isCommentForm,
          setState: handleIsCommentForm,
        }}
        handleShowComments={{
          isState: showComments,
          setState: handleShowComments,
        }}
        onSubmit={handleUpdateThread}
        numOfComments={
          commentList.length === 0
            ? props.thread.commentCount
            : commentList.length
        }
      />
      <CommentForm
        isComment={isCommentForm}
        threadId={`thr-${props.keyId}`}
        addNewComment={addNewComment}
      />
      <CommentList
        showComments={showComments}
        threadKey={`${props.keyId}`}
        comments={commentList}
        isSameUser={props.thread.author.profile_name === user?.profile_name}
      />
    </div>
  );
}
