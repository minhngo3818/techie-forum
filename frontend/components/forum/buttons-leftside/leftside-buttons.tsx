import React from "react";
import ForumButton from "../../utils/buttons/forum-button/forum-button";
import { StateDuo } from "../../../interfaces/utils/button";

export interface LeftsideButtonsType {
  keyId: string;
  isSameUser: Boolean;
  handleIsLike: StateDuo;
  handleIsMarked: StateDuo;
  handleIsEdit: StateDuo;
  handleIsComment: StateDuo;
  numOfLikes: number;
}

export default function LeftsideButtons(props: LeftsideButtonsType) {
  return (
    <>
      <ForumButton
        keyId={props.keyId}
        name="thumbsup"
        content="Thumbs Up"
        stat={props.numOfLikes}
        isState={props.handleIsLike.isState}
        setState={props.handleIsLike.setState}
      />
      <ForumButton
        keyId={props.keyId}
        name="marked"
        content="Marked"
        isState={props.handleIsMarked.isState}
        setState={props.handleIsMarked.setState}
      />
      {!props.isSameUser ? (
        <></>
      ) : (
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
    </>
  );
}
