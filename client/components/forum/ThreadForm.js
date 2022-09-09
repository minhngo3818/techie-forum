import { useState, useRef, useEffect } from "react";
import { ToggleButton } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "../../styles/ThreadForm.module.css";
import customBS from "../../styles/CustomBootstrap.module.css";

const ThreadForm = (props) => {
  return (
    <>
      <div
        className={props.isOpen ? styles.postFormOpen : styles.postFormClose}
      >
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </>
  );
};

export default ThreadForm;
