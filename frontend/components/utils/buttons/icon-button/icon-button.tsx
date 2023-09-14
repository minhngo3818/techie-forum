"use client";

import React from "react";
import ButtonInterface from "@interfaces/utils/button";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import { iconList } from "./icon-list";
import styles from "./IconButton.module.css";

export default function IconButton(props: ButtonInterface) {
  const id = `btn-${props.name}-${props.keyId}`;
  const icons = iconList;

  const activeStyle = (isActive: boolean) => {
    if (!isActive) {
      return styles.forumButton;
    }

    return `${styles.forumButton} ${styles.forumButtonActive}`;
  };

  const findIcon = () => {
    const foundIcon = icons.find((icon) => icon.name === props.name);
    if (!foundIcon) return <></>;

    if (!props.isState) {
      return foundIcon.outline;
    }

    return foundIcon.fill;
  };

  return (
    <button
      id={id}
      onClick={props.setState}
      className={activeStyle(props.isState)}
    >
      {findIcon()}
      <Tooltip anchorId={id} content={props.content} events={["hover"]} />
      {!props.stat ? <></> : <p className="text-white ml-2">{props.stat}</p>}
    </button>
  );
}
