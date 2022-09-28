import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "../ThreadForm.module.css";

const TagForm = (props) => {
  const removeTag = useCallback((indexToRemove) => {
    props.setTag({
      ...props.post,
      tags: [...props.post.tags.filter((_, index) => index !== indexToRemove)],
    });
  });

  const addTag = useCallback((e) => {
    if (e.target.value !== "") {
      props.setTag({
        ...props.post,
        tags: [...props.post.tags, e.target.value],
      });
      e.target.value = "";
    }
  });

  return (
    <div className={styles.tagInput}>
      <ul className={styles.tags}>
        {props.post.tags.map((tag, index) => {
          return (
            <li key={index} className={styles.tag}>
              <span>{tag}</span>
              <FontAwesomeIcon
                onClick={() => removeTag(index)}
                icon={faCircleXmark}
              />
            </li>
          );
        })}
      </ul>
      <input
        ref={props.ref}
        onKeyUp={(e) => (e.key === "Enter" ? addTag(e) : null)}
        placeholder="Enter to add tag"
      ></input>
    </div>
  );
};

TagForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
  }),
  postRef: PropTypes.objectOf(PropTypes.any),
  setTag: PropTypes.func.isRequired,
};

export default TagForm;
