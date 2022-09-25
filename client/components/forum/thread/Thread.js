import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Thread.module.css";

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
        <OverlayTrigger
          className={styles.button}
          placement="top"
          overlay={<Tooltip>Like</Tooltip>}
        >
          <Button type="button" className={styles.button}>
            <FontAwesomeIcon className={styles.icon} icon={faHeart} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          className={styles.button}
          placement="top"
          overlay={<Tooltip>Share</Tooltip>}
        >
          <Button type="button" className={styles.button}>
            <FontAwesomeIcon className={styles.icon} icon={faShareNodes} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          className={styles.button}
          placement="top"
          overlay={<Tooltip>Edit</Tooltip>}
        >
          <Button type="button" className={styles.button}>
            <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          className={styles.button}
          placement="top"
          overlay={<Tooltip>Comment</Tooltip>}
        >
          <Button type="button" className={styles.button}>
            <FontAwesomeIcon className={styles.icon} icon={faMessage} />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default Thread;

Thread.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.objectOf({ id: PropTypes.string, name: PropTypes.string })
  ),
};
