import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { IThread, IThreadBody, IComment } from "@interfaces/forum/post/post";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";
import CommentForm from "@components/form/form-comment/comment-form";
import { getPaginatedComments } from "@services/forum/comment/comment-service";
import useAuth from "@services/auth/auth-provider";
import { setLikeWorker } from "@services/forum/like/like-worker";
import { markThread, unmarkThread } from "@services/forum/mark/mark-service";
import ThreadHeader from "./header/thread-header";
import ThreadContent from "./content/content";
import ThreadButtons from "./buttons/thread-buttons";
import ThreadTags from "./tags/thread-tag";
const CommentList = dynamic(() => import("../comment/list/comment-list"));
import styles from "./Thread.module.css";
import ImageList from "../images/image-list/image-list";

interface ThreadType {
  keyId: number;
  thread: IThread;
}

export default function Thread(props: ThreadType) {
  const { user } = useAuth();
  const router = useRouter();

  const [thread, setThread] = useState<IThreadBody>({
    category: props.thread.category,
    title: props.thread.title,
    content: props.thread.content,
    tags: props.thread.tags,
    images: props.thread.images,
  });
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [nextQueryId, setNextQueryId] = useState<string | undefined>();
  const [isLiked, setIsLiked] = useState(props.thread.isLiked);
  const [likes, setLikes] = useState(props.thread.likes);
  const [isMarked, setIsMarked] = useState(props.thread.isMarked);
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentForm, setIsCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    let paramCategory = router.query.category;
    if (paramCategory != props.thread.category) {
      setCommentList([]);
      setShowComments(false);
    }
  }, [router.query, props.thread.category]);

  const fetchComments = useCallback(async () => {
    if (!showComments) {
      const results = await getPaginatedComments(
        props.thread.id,
        undefined,
        0,
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
    await setLikeWorker(props.thread.id, isLiked, setIsLiked, setLikes);
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

  const addNewComment = (newComment: IComment) => {
    let newCommentList = [...commentList, newComment];
    setCommentList(newCommentList);
  };

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
      <ImageList images={props.thread.images} />
      <ThreadTags
        isEdit={isEdit}
        tags={props.thread.tags}
        setThread={setThread}
      />
      <ThreadButtons
        keyId={`thr-${props.keyId}`}
        isSameUser={props.thread.author.profile_name === user?.profile_name}
        numOfLikes={likes}
        handleIsLike={{ isState: isLiked, setState: handleLike }}
        handleIsMarked={{
          isState: isMarked,
          setState: handleIsMarked,
        }}
        handleIsEdit={{
          isState: isEdit,
          setState: () => setIsEdit((isEdit) => !isEdit),
        }}
        handleIsComment={{
          isState: isCommentForm,
          setState: () => setIsCommentForm((isComment) => !isComment),
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
        threadId={props.thread.id}
        depth={0}
        addNewComment={addNewComment}
      />
      <CommentList
        showComments={showComments}
        threadKey={`${props.keyId}`}
        comments={commentList}
      />
    </div>
  );
}
