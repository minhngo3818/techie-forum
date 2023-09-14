import React from "react";
import IconButton from "@components/utils/buttons/icon-button/icon-button";
import { StateDuo } from "@interfaces/utils/button";

export interface ThreadLeftButtonsType {
  keyId: string;
  isSameUser: Boolean;
  handleIsLike: StateDuo;
  handleIsMarked: StateDuo;
  handleIsEdit: StateDuo;
  handleIsComment: StateDuo;
  numOfLikes: number;
}

export default function ThreadLeftButtons(props: ThreadLeftButtonsType) {
  return (
    <>
      <IconButton
        keyId={props.keyId}
        name="thumbsup"
        content="Thumbs Up"
        stat={props.numOfLikes}
        isState={props.handleIsLike.isState}
        setState={props.handleIsLike.setState}
      />
      <IconButton
        keyId={props.keyId}
        name="marked"
        content="Marked"
        isState={props.handleIsMarked.isState}
        setState={props.handleIsMarked.setState}
      />
      {!props.isSameUser ? (
        <></>
      ) : (
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
    </>
  );
}
