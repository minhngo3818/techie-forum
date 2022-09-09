import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Thread.module.css";

// Dummy tags
const tags = ["C++", "Console App", "System", "Algorithm", "Server"];

// Props
const Thread = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="#" alt="avatar"></img>
        <h5>{props.author}</h5>
        <p>Posted on {props.created}</p>
      </div>
      <div className={styles.content}>
        <h3>Making a super quantum computer</h3>
        <p>{props.content}</p>
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => {
          return <p key={tag}>{tag}</p>;
        })}
      </div>
      <div className={styles.buttonList}>
        <FontAwesomeIcon
          icon={faHeart}
          className={styles.button}
          type="button"
          flip
        />
        <FontAwesomeIcon
          icon={faShareNodes}
          className={styles.button}
          type="button"
          flip
        />
        <FontAwesomeIcon
          icon={faMessage}
          className={styles.button}
          type="button"
          flip
        />
      </div>
    </div>
  );
};

export default Thread;
