import React, { ChangeEvent, useRef } from "react";
import LeftsideButtons, {
  LeftsideButtonsType,
} from "../../../buttons-leftside/leftside-buttons";
import EditButton from "../../../../utils/buttons/edit-button/edit-button";
import useAutosizeTextArea from "../../../../../hooks/useAutosizeTextArea";
import styles from "./CommentBody.module.css";

export interface CommentBodyType extends LeftsideButtonsType {
  keyId: string;
  content: string;
  stat?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export default function CommentBody(props: CommentBodyType) {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(contentRef.current, props.content);

  return (
    <div className={styles.commentBody}>
      <div className={styles.commentContentWrapper}>
        {!props.handleIsEdit.isState ? (
          <React.Fragment>
            <p className={styles.commentContent}>{props.content}</p>
            <div className={styles.commentButtons}>
              <LeftsideButtons
                keyId={props.keyId}
                handleIsLike={props.handleIsLike}
                handleIsMemorized={props.handleIsMemorized}
                handleIsEdit={props.handleIsEdit}
                handleIsComment={props.handleIsComment}
                stat={props.stat}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <textarea
              ref={contentRef}
              className={styles.commentEditContent}
              rows={4}
              name="content"
              defaultValue={props.content}
              onChange={props.onChange}
            />
            <div className={styles.commentButton}>
              <EditButton
                isEdit={props.handleIsEdit.isState}
                onClick={props.handleIsEdit.setState}
                onSubmit={props.onSubmit}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
