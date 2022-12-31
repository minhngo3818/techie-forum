import ForumButton from "../../utils/buttons/forum-button/forum-button";
import { StateDuo } from "../../../interfaces/button";

export interface LeftsideButtonsType {
  keyId: string;
  handleIsLike: StateDuo;
  handleIsMemorized: StateDuo;
  handleIsEdit: StateDuo;
  handleIsComment: StateDuo;
  stat?: number;
}

export default function LeftsideButtons(props: LeftsideButtonsType) {
  return (
    <>
      <ForumButton
        keyId={props.keyId}
        name="thumbsup"
        content="Thumbs Up"
        stat={props.stat}
        isState={props.handleIsLike.isState}
        setState={props.handleIsLike.setState}
      />
      <ForumButton
        keyId={props.keyId}
        name="memorized"
        content="Memorize"
        isState={props.handleIsMemorized.isState}
        setState={props.handleIsMemorized.setState}
      />
      <ForumButton
        keyId={props.keyId}
        name="edit"
        content="Edit"
        isState={props.handleIsEdit.isState}
        setState={props.handleIsEdit.setState}
      />
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
