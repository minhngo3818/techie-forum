import React, { useState, useRef, ChangeEvent } from "react";
import { postComment } from "@services/forum/comment/comment-service";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import { Emoji, Image as ImageIcon } from "@components/icons/icons";
import styles from "./CommentForm.module.css";
import Image from "next/image";
import { IComment, ICommentPost } from "@interfaces/forum/post/post";

interface CommentForm {
  threadId: string;
  parentId?: string;
  isComment: boolean;
  depth: number;
  addNewComment: (newComment: IComment) => void;
}

export default function CommentForm(props: CommentForm) {
  const [comment, setComment] = useState<ICommentPost>({
    post_thread: props.threadId,
    parent: props.parentId,
    content: "",
    images: [],
    depth: props.depth + 1,
  });
  const [imageCmt, setImage] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const imageCmtRef = useRef<HTMLInputElement>(null);

  useAutosizeTextArea(commentRef.current, comment?.content);

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ ...comment, content: event.target.value });
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let newImage = URL.createObjectURL(event.target.files[0]);
      setImage(newImage);
    }
  };

  const handleSubmitComment = async () => {
    try {
      console.log(comment);
      if (comment.content || (comment.images && comment.images.length > 0)) {
        let newComment = await postComment(comment);
        if (newComment) props.addNewComment(newComment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {props.isComment && (
        <form className={styles.cmtForm}>
          <h4 className={styles.cmtFormLabel}>Add Comment</h4>
          <textarea
            className={styles.cmtFormInput}
            rows={3}
            ref={commentRef}
            value={comment.content}
            onChange={handleChangeContent}
            onSubmit={handleSubmitComment}
          />

          {imageCmt !== "" && (
            <div className={styles.cmtFormImage}>
              <div className={styles.cmtFormInnerImage}>
                <Image src={imageCmt} alt="cmt-input-image" fill />
              </div>
            </div>
          )}

          <div className={styles.cmtFormTools}>
            <button
              id={`emoji-btn-${props.threadId}`}
              className={styles.cmtFormButton}
            >
              <Tooltip
                anchorId={`emoji-btn-${props.threadId}`}
                content="Add Emoji"
                events={["hover"]}
              />
              <Emoji />
            </button>
            <label
              id={`cmt-upload-img-${props.threadId}`}
              htmlFor={`cmt-upload-image-${props.threadId}`}
              className={styles.cmtFormButton}
            >
              <Tooltip
                anchorId={`cmt-upload-img-${props.threadId}`}
                content="Add image"
                events={["hover"]}
              />
              <input
                id={`cmt-upload-image-${props.threadId}`}
                ref={imageCmtRef}
                name={`cmt-upload-image-${props.threadId}`}
                type="file"
                className="hidden"
                onChange={handleChangeImage}
              />
              <ImageIcon />
            </label>
            <button
              type="button"
              className={styles.cmtFormReply}
              onClick={handleSubmitComment}
            >
              Reply
            </button>
          </div>
        </form>
      )}
    </>
  );
}
