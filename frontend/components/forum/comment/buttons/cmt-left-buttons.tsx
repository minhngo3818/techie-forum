import React from "react";
import ForumButton from "@components/utils/buttons/forum-button/forum-button";
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
      <ForumButton
        keyId={props.keyId}
        name="thumbsup"
        content="Thumbs Up"
        stat={props.numOfLikes}
        isState={props.handleIsLike.isState}
        setState={props.handleIsLike.setState}
      />
      {props.isSameUser && (
        <ForumButton
          keyId={props.keyId}
          name="edit"
          content="Edit"
          isState={props.handleIsEdit.isState}
          setState={props.handleIsEdit.setState}
        />
      )}
      <ForumButton
        keyId={props.keyId}
        name="comment"
        content="Comment"
        isState={props.handleIsComment.isState}
        setState={props.handleIsComment.setState}
      />
      {props.numOfReplies !== 0 && (
        <ForumButton
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
