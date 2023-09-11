import React from "react";
import styles from "./ShowCommentsBtn.module.css";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import ButtonInterface from "@interfaces/utils/button";

export interface ShowCommentsBtnType extends ButtonInterface {
  numOfComments: number;
}

export default function ShowCommentsBtn(props: ShowCommentsBtnType) {
  return (
    <button
      id={`${props.name}-${props.keyId}`}
      className={`${styles.showCommentsButton} ${
        props.isState && styles.showCommentsButtonActive
      }`}
      onClick={props.setState}
    >
      {`Comment: ${props.numOfComments}`}
      <Tooltip
        anchorId={`comment-list-btn-${props.keyId}`}
        content={props.content}
        events={["hover"]}
      />
    </button>
  );
}
