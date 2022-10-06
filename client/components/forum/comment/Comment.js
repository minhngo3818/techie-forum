import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import customBS from "../../../styles/CustomBootstrap.module.css";
import styles from "./Comment.module.css";
const Comment = (props) => {
  const [comment, setComment] = useState(props?.content);
  const [isEdit, setIsEdit] = useState(false);
  const cmtRef = useRef();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isEdit ? (
          <Form>
            <Form.Control
              className={customBS.formTextarea}
              ref={cmtRef}
              as="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form>
        ) : (
          <p>{props.content}</p>
        )}
      </div>
      <div></div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Comment;
