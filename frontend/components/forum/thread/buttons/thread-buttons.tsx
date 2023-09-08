import React from "react";
import ThreadLeftButtons, {
  ThreadLeftButtonsType,
} from "./left-buttons/left-buttons";
import ShowCommentsBtn from "./show-comments-btn/show-comments-btn";
import EditButton from "../../../utils/buttons/edit-button/edit-button";
import { StateDuo } from "../../../../interfaces/utils/button";
import styles from "./ThreadButtons.module.css";

export interface ThreadButtonTypes extends ThreadLeftButtonsType {
  isSameUser: Boolean;
  handleShowComments: StateDuo;
  onSubmit(event: React.FormEvent<HTMLButtonElement>): void;
  numOfLikes: number;
  numOfComments: number;
}

export default function ThreadButtons(props: ThreadButtonTypes) {
  return (
    <div className={styles.threadButtons}>
      <div className={styles.threadButtonsLeftside}>
        {props.handleIsEdit.isState ? (
          <EditButton
            isEdit={props.handleIsEdit.isState}
            isCheckCancelOnly={true}
            onClick={props.handleIsEdit.setState}
            onSubmit={props.onSubmit}
          />
        ) : (
          <ThreadLeftButtons
            keyId={props.keyId}
            isSameUser={props.isSameUser}
            numOfLikes={props.numOfLikes}
            handleIsLike={props.handleIsLike}
            handleIsMarked={props.handleIsMarked}
            handleIsEdit={props.handleIsEdit}
            handleIsComment={props.handleIsComment}
          />
        )}
      </div>
      <ShowCommentsBtn
        name="show-comments-btn"
        keyId={props.keyId}
        content="Show comments"
        numOfComments={props.numOfComments}
        isState={props.handleShowComments.isState}
        setState={props.handleShowComments.setState}
      />
    </div>
  );
}
