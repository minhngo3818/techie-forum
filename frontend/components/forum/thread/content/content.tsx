import { useRef } from "react";
import { ChangeEvent } from "../../../../interfaces/forum/form/form-field";
import useAutosizeTextArea from "../../../../hooks/useAutosizeTextArea";
import styles from "./ThreadContent.module.css";

interface ThreadContentType {
  isEdit?: boolean;
  title: string;
  content: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ThreadContent(props: ThreadContentType) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(contentRef.current, props.content);

  return (
    <div className={styles.threadContentWrapper}>
      {!props.isEdit ? (
        <>
          <h3 className={styles.threadTitle}>{props.title}</h3>
          <p className={styles.threadContent}>{props.content}</p>
        </>
      ) : (
        <>
          <textarea
            className={`${styles.threadTitle} ${styles.threadInput}`}
            ref={titleRef}
            name="thread-title"
            rows={1}
            defaultValue={props.title}
            onChange={props.onChange}
          />
          <textarea
            className={`${styles.threadContent} + ${styles.threadInput}`}
            ref={contentRef}
            name="thread-content"
            rows={4}
            defaultValue={props.content}
            onChange={props.onChange}
            role="textbox"
          />
        </>
      )}
    </div>
  );
}
