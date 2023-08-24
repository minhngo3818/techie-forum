import React from "react";
import LeftsideButtons, {
  LeftsideButtonsType,
} from "../../buttons-leftside/leftside-buttons";
import ShowCommentsBtn from "./comment-list-button/show-comments";
import EditButton from "../../../utils/buttons/edit-button/edit-button";
import { StateDuo } from "../../../../interfaces/utils/button";
import styles from "./ThreadButtons.module.css";

export interface ThreadButtonTypes extends LeftsideButtonsType {
  isSameUser: Boolean;
  handleShowComments: StateDuo;
  onSubmit(event: React.FormEvent<HTMLButtonElement>): void;
  numOfLikes?: number;
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
          <LeftsideButtons
            keyId={props.keyId}
            isSameUser={props.isSameUser}
            stat={props.numOfComments}
            handleIsLike={props.handleIsLike}
            handleIsMemorized={props.handleIsMemorized}
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
