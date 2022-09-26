import PropTypes from "prop-types";
import { Element } from "react-is";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "../ThreadForm.module.css";

const TagForm = (props) => {
  return (
    <div className={styles.tagInput}>
      <ul className={styles.tags}>
        {props.tags.map((tag, index) => {
          return (
            <li key={index} className={styles.tag}>
              <span>{tag}</span>
              <FontAwesomeIcon
                onClick={() => props.removeTag(index)}
                icon={faCircleXmark}
              />
            </li>
          );
        })}
      </ul>
      <input
        ref={props.ref}
        onKeyUp={(e) => (e.key === "Enter" ? props.addTag(e) : null)}
        placeholder="Enter to add tag"
      ></input>
    </div>
  );
};

TagForm.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default TagForm;
