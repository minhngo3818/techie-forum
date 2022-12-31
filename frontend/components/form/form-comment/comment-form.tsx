import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import { Emoji, Image as ImageIcon } from "../../icons/icons";
import styles from "./CommentForm.module.css";
import Image from "next/image";

interface CommentForm {
  threadId: string;
  isComment: boolean;
}

export default function CommentForm(props: CommentForm) {
  const [comment, setComment] = useState("");
  const [imageCmt, setImage] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const imageCmtRef = useRef<HTMLInputElement>(null);

  useAutosizeTextArea(commentRef.current, comment);

  const handleChangeComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    },
    []
  );

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      console.log("button was clicked");
      if (event.target.files) {
        let newImage = URL.createObjectURL(event.target.files[0]);
        setImage(newImage);
      }
    },
    []
  );

  const handleSubmitComment = () => {
    console.log("Send add-comment request");
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
            value={comment}
            onChange={handleChangeComment}
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
