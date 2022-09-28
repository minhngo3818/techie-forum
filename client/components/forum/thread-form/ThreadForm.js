import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../services/auth/AuthService";
import ThreadServices from "../../../services/forum/ThreadServices";
import PropTypes from "prop-types";
import TagForm from "./tag-form/TagForm";
import { EmojiButton, ImageButton } from "./buttons/Buttons";
import { Form, Button } from "react-bootstrap";
import styles from "./ThreadForm.module.css";
import customBS from "../../../styles/CustomBootstrap.module.css";

const postObject = {
  title: "",
  content: "",
  tags: [],
  category: "",
};

const ThreadForm = (props) => {
  // Auth Context
  const { auth } = useContext(AuthContext);

  // Post
  const [postData, setPostData] = useState(postObject);
  const postRef = useRef();

  useEffect(() => {
    // Keep tracking the current page to set thread category
    setPostData({ ...postData, category: props.category });
  }, [props]);

  // Handlers
  const handleSumitPost = async (e) => {
    e.preventDefault();
    console.log(postData);
    if (postData.title !== "" && postData.content !== "") {
      let access = auth?.access;
      ThreadServices.postThread(access, postData);
    }

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
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.label}>Content</Form.Label>
          <Form.Control
            ref={postRef}
            as="textarea"
            className={customBS.formTextarea}
            placeholder="Add thread content"
            onChange={(e) =>
              setPostData({ ...postData, content: e.target.value })
            }
            rows="4"
            cols="50"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.label}>Tags</Form.Label>
          <TagForm postRef={postRef} post={postData} setTag={setPostData} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default ThreadForm;

ThreadForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  category: PropTypes.string,
};
