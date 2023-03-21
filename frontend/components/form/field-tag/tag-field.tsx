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
import { TagInterface } from "../../../interfaces/forum/post/post";

interface TagFieldType {
  tags: Set<TagInterface>;
  isLabel?: boolean;
  onRemove: (tag: TagInterface) => void;
  onAdd: (tag: TagInterface) => void;
}

export default function TagField(props: TagFieldType) {
  const [tag, setTag] = useState({ name: "" } as TagInterface);
  const tagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.focus();
    }
  }, []);

  const handleChangeTag = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTag({ ...tag, name: event.target?.value });
    },
    [tag]
  );

  const handleRemoveTag = useCallback(
    (tag: TagInterface) => {
      console.log("Remove was clicked");
      props.onRemove(tag);
    },
    [props]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.onAdd(tag);
        setTag({ name: "" } as TagInterface);
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
              <li key={tag.name} className={styles.tagFieldItem}>
                <p className={styles.tagFieldName}>{tag.name}</p>
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
          value={tag.name}
          onChange={handleChangeTag}
          onKeyUp={handleKeyDown}
          placeholder="Enter to add tag"
        ></input>
      </div>
    </div>
  );
}
