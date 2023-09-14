import React from "react";
import IconButton from "@components/utils/buttons/icon-button/icon-button";
import { StateDuo } from "@interfaces/utils/button";
import styles from "./CommentLeftButtons.module.css";

export interface CmtLeftButtonsType {
  keyId: string;
  isSameUser: Boolean;
  handleIsLike: StateDuo;
  handleIsEdit: StateDuo;
  handleIsComment: StateDuo;
  handleShowReplies: StateDuo;
  numOfReplies: number;
  numOfLikes: number;
}

export default function CommentLeftButtons(props: CmtLeftButtonsType) {
  return (
    <div className={styles.CmtLeftButtonsWrapper}>
      <IconButton
        keyId={props.keyId}
        name="thumbsup"
        content="Thumbs Up"
        stat={props.numOfLikes}
        isState={props.handleIsLike.isState}
        setState={props.handleIsLike.setState}
      />
      {props.isSameUser && (
        <IconButton
          keyId={props.keyId}
          name="edit"
          content="Edit"
          isState={props.handleIsEdit.isState}
          setState={props.handleIsEdit.setState}
        />
      )}
      <IconButton
        keyId={props.keyId}
        name="comment"
        content="Comment"
        isState={props.handleIsComment.isState}
        setState={props.handleIsComment.setState}
      />
      {props.numOfReplies !== 0 && (
        <IconButton
          keyId={props.keyId}
          name="reply"
          content="Reply"
          stat={props.numOfReplies}
          isState={props.handleShowReplies.isState}
          setState={props.handleShowReplies.setState}
        />
      )}
    </div>
  );
}
