import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../../../services/auth/AuthService";
import ThreadServices from "../../../services/forum/ThreadServices";
import PropTypes from "prop-types";
import TagForm from "./tag-form/TagForm";
import { EmojiButton, ImageButton } from "./buttons/Buttons";
import { Form, Button } from "react-bootstrap";
import styles from "./ThreadForm.module.css";
import customBS from "../../../styles/CustomBootstrap.module.css";

const ThreadForm = (props) => {
  const postObject = {
    title: "",
    content: "",
    tags: [],
    category: props.category,
  };

  const [postData, setPostData] = useState(postObject);
  const postRef = useRef();

  // Auth Context
  const { auth } = useContext(AuthContext);

  // Handlers
  const removeTag = (indexToRemove) => {
    setPostData({
      ...postData,
      tags: [...postData.tags.filter((_, index) => index !== indexToRemove)],
    });
  };

  const addTag = (e) => {
    if (e.target.value !== "") {
      setPostData({ ...postData, tags: [...postData.tags, e.target.value] });
      e.target.value = "";
    }
  };

  const handleSumitPost = async (e) => {
    e.preventDefault();
    ThreadServices.postThread(auth?.access, postData);

    // refresh states
    setPostData(postObject);
  };

  return (
    <div
      className={styles.postForm}
      id={props.isOpen ? styles.formOpen : styles.formClose}
    >
      <Form className={styles.formContent}>
        <div className={styles.formButtons}>
          <ImageButton />
          <EmojiButton />
          <Button
            className={customBS.btn}
            id={styles.postButton}
            onClick={handleSumitPost}
          >
            POST
          </Button>
        </div>
        <Form.Group>
          <Form.Label className={styles.label}>Title</Form.Label>
          <Form.Control
            ref={postRef}
            className={customBS.formControl}
            placeholder="Enter a tittle"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.label}>Content</Form.Label>
          <Form.Control
            ref={postRef}
            as="textarea"
            className={customBS.formTextarea}
            placeholder="Add thread content"
            rows="4"
            cols="50"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.label}>Tags</Form.Label>
          <TagForm
            ref={postRef}
            tags={postData.tags}
            addTag={addTag}
            removeTag={removeTag}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default ThreadForm;

ThreadForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
