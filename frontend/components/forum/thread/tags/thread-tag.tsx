import React, { SetStateAction, Dispatch } from "react";
import TagField from "../../../form/field-tag/tag-field";
import styles from "./ThreadTags.module.css";
import {
  useAddTag,
  useRemoveTag,
} from "../../../form/field-tag/function/handleTag";
import { IThreadBody } from "../../../../interfaces/forum/post/post";

interface ThreadTagsType {
  isEdit: boolean;
  tags: Set<string>;
  setThread: Dispatch<SetStateAction<IThreadBody>>;
}

export default function ThreadTags(props: ThreadTagsType) {
  const handleAddTag = useAddTag(props.tags, props.setThread);
  const handleRemoveTag = useRemoveTag(props.tags, props.setThread);

  return (
    <div className={styles.threadTags}>
      {!props.isEdit ? (
        Array.from(props.tags).map((tag) => {
          return (
            <p key={tag} className={styles.threadTag}>
              {tag}
            </p>
          );
        })
      ) : (
        <TagField
          tags={props.tags}
          onAdd={handleAddTag}
          onRemove={handleRemoveTag}
        />
      )}
    </div>
  );
}
