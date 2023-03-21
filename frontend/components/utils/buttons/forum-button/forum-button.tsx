import React from "react";
import {
  ThumbUpOutline,
  ThumbUp,
  CheckBoxOutline,
  CheckBox,
  Edit,
  EditOutline,
  CommentOutline,
  Comment,
} from "../../../icons/icons";
import ButtonInterface from "../../../../interfaces/utils/button";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import styles from "./ForumButton.module.css";

interface IconType {
  name: string;
  fill: JSX.Element;
  outline: JSX.Element;
}

export default function ForumButton(props: ButtonInterface) {
  const id = `btn-${props.name}-${props.keyId}`;

  const icons: IconType[] = [
    {
      name: "thumbsup",
      fill: <ThumbUp className={styles.forumIcon} />,
      outline: <ThumbUpOutline className={styles.forumIcon} />,
    },
    {
      name: "memorized",
      fill: <CheckBox className={styles.forumIcon} />,
      outline: <CheckBoxOutline className={styles.forumIcon} />,
    },
    {
      name: "edit",
      fill: <Edit className={styles.forumIcon} />,
      outline: <EditOutline className={styles.forumIcon} />,
    },
    {
      name: "comment",
      fill: <Comment className={styles.forumIcon} />,
      outline: <CommentOutline className={styles.forumIcon} />,
    },
  ];

  function activeStyle(isActive: boolean) {
    if (!isActive) {
      return styles.forumButton;
    }

    return `${styles.forumButton} ${styles.forumButtonActive}`;
  }

  function findIcon() {
    const foundIcon = icons.find((icon) => icon.name === props.name);
    if (!props.isState) {
      return foundIcon?.outline;
    }

    return foundIcon?.fill;
  }

  return (
    <button
      id={id}
      onClick={props.setState}
      className={activeStyle(props.isState)}
    >
      {findIcon()}
      <Tooltip anchorId={id} content={props.content} events={["hover"]} />
      {props.name === "thumbsup" && (
        <p className="text-white ml-2">{props.stat}</p>
      )}
    </button>
  );
}
