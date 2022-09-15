import { useState, useRef, useEffect } from "react";
import ImageButton from "./buttons/ImageButton";
import { Form, Button } from "react-bootstrap";
import styles from "../../styles/ThreadForm.module.css";
import customBS from "../../styles/CustomBootstrap.module.css";
import EmojiButton from "./buttons/EmojiButton";

const ThreadForm = (props) => {
  return (
    <div className={props.isOpen ? styles.postFormOpen : styles.postFormClose}>
      <Form className={styles.Form}>
        <Form.Label className={styles.FormButtons}>
          <ImageButton />
          <EmojiButton />
        </Form.Label>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            className={styles.FormControl}
            placeholder="What's poppin, eh?"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Your Tweet</Form.Label>
          <Form.Control
            className={styles.FormControl}
            placeholder="What's poppin, eh?"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            className={styles.FormControl}
            placeholder="What's poppin, eh?"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Button>Post</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ThreadForm;
