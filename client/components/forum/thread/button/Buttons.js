import PropTypes from "prop-types";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faShareNodes,
  faHeart as solidHeart,
  faPenToSquare as solidPenToSquare,
  faMessage as solidMessage,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../Thread.module.css";

const LikeButton = (props) => {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>}>
      <Button type="button" className={styles.button} onClick={props.onChange}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={props.isLiked ? solidHeart : faHeart}
          flip
        />
      </Button>
    </OverlayTrigger>
  );
};

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const EditButton = (props) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{props.isEdit ? "Abort" : "Edit"}</Tooltip>}
    >
      <Button
        type="button"
        className={styles.button}
        id={props.isEdit ? styles.active : null}
        onClick={props.onChange}
      >
        <FontAwesomeIcon
          className={styles.icon}
          icon={props.isEdit ? solidPenToSquare : faPenToSquare}
          flip
        />
      </Button>
    </OverlayTrigger>
  );
};

EditButton.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ShareButton = (props) => {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>Share</Tooltip>}>
      <Button type="button" className={styles.button}>
        <FontAwesomeIcon className={styles.icon} icon={faShareNodes} flip />
      </Button>
    </OverlayTrigger>
  );
};

const CommentButton = (props) => {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>Comment</Tooltip>}>
      <Button
        type="button"
        className={styles.button}
        id={props.isComment ? styles.active : null}
        onClick={props.onChange}
      >
        <FontAwesomeIcon
          className={styles.icon}
          icon={props.isComment ? solidMessage : faMessage}
          flip
        />
      </Button>
    </OverlayTrigger>
  );
};

CommentButton.propTypes = {
  isComment: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ShowCommentButton = (props) => {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>Show Comment</Tooltip>}>
      <Button
        type="button"
        className={styles.showCmtBtn}
        id={props.isShow ? styles.active : null}
        onClick={props.onChange}
      >
        Comment: {props.numOfComments}
      </Button>
    </OverlayTrigger>
  );
};

ShowCommentButton.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  numOfComments: PropTypes.number,
};

export {
  LikeButton,
  EditButton,
  ShareButton,
  CommentButton,
  ShowCommentButton,
};
