import React, { FC } from "react";
import {
  InputProps,
  TextareaProps,
} from "../../../interfaces/forum/post/form-field";
import styles from "./HorizontalField.module.css";

const HorzField: FC<InputProps | TextareaProps> = (props) => {
  switch (props.fieldType) {
    case "input":
      return (
        <div className={styles.horzFieldWrapper}>
          <h4 className={styles.horzFieldLabel}>{props.label}</h4>
          <input
            className={styles.horzField}
            ref={props.innerRef}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            required={props.required}
          />
        </div>
      );
    case "textarea":
      return (
        <div className={styles.horzFieldWrapper}>
          <h4 className={styles.horzFieldLabel}>{props.label}</h4>
          <textarea
            className={styles.horzField}
            ref={props.innerRef}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            rows={props.rows}
            cols={props.cols}
            required={props.required}
          />
        </div>
      );
    default:
      return null;
  }
};

export default HorzField;
