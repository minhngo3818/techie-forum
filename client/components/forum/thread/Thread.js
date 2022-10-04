import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  LikeButton,
  EditButton,
  ShareButton,
  CommentButton,
} from "./button/Buttons";
import { Form } from "react-bootstrap";
import customBS from "../../../styles/CustomBootstrap.module.css";
import styles from "./Thread.module.css";

const Thread = (props) => {
  // States
  const [isLiked, setIsLiked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [editThread, setEditThread] = useState({
    title: props.title,
    content: props.content,
  });
  const editRef = useRef();

  // Handlers
  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleIsEdit = () => {
    if (isEdit) {
      setEditThread({ title: props.title, content: props.content });
    }
    setIsEdit((prev) => !prev);
  };

  const handleComment = () => {
    setIsComment((prev) => !prev);
  };

  useEffect(() => {
    if (isEdit) {
      editRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={props.avatar} alt="avatar" />
        <h5>{props.author}</h5>
        <p>Posted on {props.created}</p>
      </div>
      <div className={styles.content}>
        {isEdit ? (
          <Form>
            <Form.Group className={styles.editGroup}>
              <Form.Control
                ref={editRef}
                className={customBS.formControl}
                id={customBS.title}
                as="input"
                value={editThread.title}
                onChange={(e) =>
                  setEditThread({ ...editThread, title: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group className={styles.editGroup}>
              <Form.Control
                ref={editRef}
                className={customBS.formTextarea}
                as="textarea"
                value={editThread.content}
                onChange={(e) =>
                  setEditThread({ ...editThread, content: e.target.value })
                }
                rows="4"
                cols="50"
              >
                {editThread.content}
              </Form.Control>
            </Form.Group>
          </Form>
        ) : (
          <div aria-label="render thread data">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
          </div>
        )}
      </div>
      <div className={styles.tags}>
        {props.tags.map((tag) => {
          return <p key={tag}>{tag}</p>;
        })}
      </div>
      <div className={styles.buttonList}>
        <LikeButton isLiked={isLiked} onChange={handleLike} />
        <ShareButton />
        <EditButton isEdit={isEdit} onChange={handleIsEdit} />
        <CommentButton isComment={isComment} onChange={handleComment} />
      </div>
    </div>
  );
};

export default Thread;

Thread.propTypes = {
  author: PropTypes.string,
  avatar: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  // Temporary string type tags for testing UI, replace back to object if add service
  // tags: PropTypes.arrayOf(
  //   PropTypes.objectOf({ id: PropTypes.string, name: PropTypes.string })
  // ),
};
