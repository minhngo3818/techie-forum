import { useState, useRef, useEffect } from "react";
import ImageButton from "./buttons/ImageButton";
import { Form, Button } from "react-bootstrap";
import styles from "./ThreadForm.module.css";
import customBS from "../../../styles/CustomBootstrap.module.css";
import EmojiButton from "./buttons/EmojiButton";

const ThreadForm = (props) => {
  return (
    <div
      className={styles.postForm}
      id={props.isOpen ? styles.formOpen : styles.formClose}
    >
      <Form className={styles.formContent}>
        <div className={styles.formButtons}>
          <ImageButton />
          <EmojiButton />
          <Button className={customBS.btn} id={styles.postButton}>
            POST
          </Button>
        </div>
        <Form.Group>
          <Form.Label className={styles.label}>Title</Form.Label>
          <Form.Control
            className={customBS.formControl}
            placeholder="What's poppin, eh?"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.label}>Content</Form.Label>
          <textarea
            className={styles.threadContent}
            placeholder="What's poppin eh?"
            rows="4"
            cols="50"
          ></textarea>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.label}>Tags</Form.Label>
          <Form.Control
            className={customBS.formControl}
            placeholder="What's poppin, eh?"
          ></Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ThreadForm;
