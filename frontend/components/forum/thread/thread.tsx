import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import ThreadHeader from "./header/thread-header";
import ThreadContent from "./content/content";
import ThreadButtons from "./buttons/thread-buttons";
import ThreadTags from "./tags/thread-tag";
const CommentList = dynamic(
  () => import("../comment/comment-list/comment-list")
);
const CommentForm = dynamic(
  () => import("../../form/form-comment/comment-form")
);
import {
  ThreadInterface,
  ThreadBodyInterface,
  CommentInterface,
} from "../../../interfaces/forum/post/post";
import styles from "./Thread.module.css";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";

interface ThreadType extends ThreadInterface {
  keyId: number;
}

export default function Thread(props: ThreadType) {
  let commentList: CommentInterface[] = [
    {
      thid: "1",
      cid: "1",
      author: "Jotaro",
      authorId: "29038rsfasd",
      avatar: "/jotaro.jpg",
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
      thid: "1",
      cid: "2",
      author: "Josuke",
      authorId: "29038rsfasd",
      avatar: "/josuke.jpg",
      content:
        "Excepteur sint occaecat cupidatat non proident, \
      sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: new Date(Date.now()),
      likes: 0,
    },
  ];

  const [thread, setThread] = useState<ThreadBodyInterface>({
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

  const handleIsLike = useCallback(() => {
    // Call api to update data
    setIsLike((isLike) => !isLike);
  }, []);

  const handleIsMemorized = useCallback(() => {
    setIsMemorized((isMemorized) => !isMemorized);
  }, []);

  const handleIsEdit = useCallback(() => {
    // Call api to update data
    setIsEdit((isEdit) => !isEdit);
  }, []);

  const handleIsCommentForm = useCallback(() => {
    // Call api to update data
    setIsComment((isComment) => !isComment);
  }, []);

  const handleShowComments = useCallback(() => {
    setShowComments((showComments) => !showComments);
  }, []);

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
      <ThreadHeader
        author={props.author}
        authorId={props.authorId}
        avatar={props.avatar}
        date={props.date}
      />
      <ThreadContent
        isEdit={isEdit}
        title={props.title}
        content={props.content}
        onChange={handleThreadChange}
      />
      <div className={styles.threadContentImages}>
        {props.images?.map((image, index) => {
          return (
            <div key={index}>
              <Image src={image} alt="content-image" fill />
            </div>
          );
        })}
      </div>
      <ThreadTags isEdit={isEdit} tags={props.tags} setThread={setThread} />
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
