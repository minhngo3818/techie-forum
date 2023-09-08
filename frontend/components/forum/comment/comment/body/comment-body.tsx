import React, { ChangeEvent, useRef } from "react";
import CmtLeftButtons, {
  CmtLeftButtonsType,
} from "../../buttons/cmt-left-buttons";
import EditButton from "../../../../utils/buttons/edit-button/edit-button";
import useAutosizeTextArea from "../../../../../hooks/useAutosizeTextArea";
import styles from "./CommentBody.module.css";

export interface CommentBodyType extends CmtLeftButtonsType {
  keyId: string;
  content: string;
  isSameUser: boolean;
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
              <CmtLeftButtons
                keyId={props.keyId}
                isSameUser={props.isSameUser}
                handleIsLike={props.handleIsLike}
                handleIsEdit={props.handleIsEdit}
                handleIsComment={props.handleIsComment}
                numOfLikes={props.numOfLikes}
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
