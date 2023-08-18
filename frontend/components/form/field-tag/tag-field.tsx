import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styles from "./TagField.module.css";
import { ClosePixel } from "../../icons/icons";
// import { string } from "../../../interfaces/forum/post/post";

interface TagFieldType {
  tags: Set<string>;
  isLabel?: boolean;
  onRemove: (tag: string) => void;
  onAdd: (tag: string) => void;
}

export default function TagField(props: TagFieldType) {
  const [tag, setTag] = useState("");
  const tagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.focus();
    }
  }, []);

  const handleChangeTag = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTag(event.target?.value);
    },
    [tag]
  );

  const handleRemoveTag = useCallback(
    (tag: string) => {
      console.log("Remove was clicked");
      props.onRemove(tag);
    },
    [props]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.onAdd(tag);
        setTag("");
      }
    },
    [tag, props]
  );

  return (
    <div className={styles.tagFieldContainer}>
      {props.isLabel && <h3 className={styles.tagFieldLabel}>Tag</h3>}
      <div className={styles.tagFieldWrapper}>
        <ul className={styles.tagFieldList}>
          {Array.from(props.tags).map((tag) => {
            return (
              <li key={tag} className={styles.tagFieldItem}>
                <p className={styles.tagFieldName}>{tag}</p>
                <button
                  className={styles.tagFieldBtn}
                  onClick={() => handleRemoveTag(tag)}
                >
                  <ClosePixel />
                </button>
              </li>
            );
          })}
        </ul>
        <input
          className={styles.tagFieldInput}
          name="tag-field"
          type="input"
          ref={tagRef}
          value={tag}
          onChange={handleChangeTag}
          onKeyUp={handleKeyDown}
          placeholder="Enter to add tag"
        ></input>
      </div>
    </div>
  );
}
