import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import ThreadHeader from "./header/thread-header";
import ThreadContent from "./content/content";
import ThreadButtons from "./buttons/thread-buttons";
import ThreadTags from "./tags/thread-tag";
import ThreadImages from "./images/images";
const CommentList = dynamic(
  () => import("../comment/comment-list/comment-list")
);
const CommentForm = dynamic(
  () => import("../../form/form-comment/comment-form")
);
import {
  IThread,
  IThreadBody,
  CommentInterface,
} from "../../../interfaces/forum/post/post";
import styles from "./Thread.module.css";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";

interface ThreadType extends IThread {
  keyId: number;
}

export default function Thread(props: ThreadType) {
  let commentList: CommentInterface[] = [
    {
      id: "123",
      thid: "1",
      pcid: "1",
      author: {
        id: "29038rsfasd",
        profile_name: "Jotaro",
        avatar: "/jotaro.jpg",
      },
      depth: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
        tempor incididunt ut labore et dolore magna aliqua.\
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa\
        qui officia deserunt mollit anim id est laborum. ",
      date: new Date(Date.now()),
      likes: 0,
    },
    {
      id: "1223",
      thid: "1",
      pcid: "2",
      author: {
        profile_name: "Josuke",
        id: "29038rsfasd",
        avatar: "/josuke.jpg",
      },
      depth: 2,
      content:
        "Excepteur sint occaecat cupidatat non proident, \
      sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: new Date(Date.now()),
      likes: 0,
    },
  ];

  const [thread, setThread] = useState<IThreadBody>({
    category: props.category,
    title: props.title,
    content: props.content,
    tags: props.tags,
    images: props.images,
  });
  const [isLike, setIsLike] = useState(false);
  const [isMemorized, setIsMemorized] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentForm, setIsComment] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleIsLike = () => {
    // Call api to update data
    setIsLike((isLike) => !isLike);
  };

  const handleIsMemorized = () => {
    setIsMemorized((isMemorized) => !isMemorized);
  };

  const handleIsEdit = () => {
    // Call api to update data
    setIsEdit((isEdit) => !isEdit);
  };

  const handleIsCommentForm = () => {
    // Call api to update data
    setIsComment((isComment) => !isComment);
  };

  const handleShowComments = () => {
    setShowComments((showComments) => !showComments);
  };

  // Thread
  const handleThreadChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setThread((thread) => ({ ...thread, [name]: value }));
    },
    []
  );

  const handleThreadSubmit = () => {};

  return (
    <div className={styles.thread}>
      <ThreadHeader author={props.author} date={props.date} />
      <ThreadContent
        isEdit={isEdit}
        title={props.title}
        content={props.content}
        onChange={handleThreadChange}
      />
      <ThreadImages images={props.images} />
      <ThreadTags
        isEdit={isEdit}
        tags={new Set<string>(props.tags)}
        setThread={setThread}
      />
      <ThreadButtons
        keyId={`thr-${props.keyId}`}
        numOfLikes={props.likes}
        handleIsLike={{ isState: isLike, setState: handleIsLike }}
        handleIsMemorized={{
          isState: isMemorized,
          setState: handleIsMemorized,
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
        onSubmit={handleThreadSubmit}
        numOfComments={commentList.length}
      />
      <CommentForm isComment={isCommentForm} threadId={`thr-${props.keyId}`} />
      <CommentList
        showComments={showComments}
        threadKey={`${props.keyId}`}
        comments={commentList}
      />
    </div>
  );
}
