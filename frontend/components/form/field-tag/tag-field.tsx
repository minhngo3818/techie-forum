import React, {
  useState,
  useRef,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styles from "./TagField.module.css";
import { ClosePixel } from "@components/icons/icons";

interface TagFieldType {
  tags: string[] | undefined;
  isLabel?: boolean;
  onRemove: (tag: string) => void;
  onAdd: (tag: string) => void;
}

export default function TagField(props: TagFieldType) {
  const [tag, setTag] = useState("");
  const tagRef = useRef<HTMLInputElement>(null);

  const handleChangeTag =
    (event: ChangeEvent<HTMLInputElement>) => {
      setTag(event.target?.value);
    }

  const handleRemoveTag = 
    (tag: string) => {
      console.log("Remove was clicked");
      props.onRemove(tag);
    }

  const handleKeyDown = 
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.onAdd(tag);
        setTag("");
      }
    }

  // Render a list of tags
  const Tags = (): JSX.Element => {
    if (!Array.isArray(props.tags)) {
      return <></>;
    }

    return (
      <>
        {props.tags.map((tag) => {
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
      </>
    );
  };

  return (
    <div className={styles.tagFieldContainer}>
      {props.isLabel && <h3 className={styles.tagFieldLabel}>Tag</h3>}
      <div className={styles.tagFieldWrapper}>
        <ul className={styles.tagFieldList}>
          <Tags />
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
