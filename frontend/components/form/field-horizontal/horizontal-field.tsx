import React, { FC } from "react";
import { InputProps, TextareaProps } from "@interfaces/forum/form/form-field";
import styles from "./HorizontalField.module.css";

const HorzField: FC<InputProps | TextareaProps> = (props) => {
  const handleFileInput = () => {
    const buttonRefObj = props.innerRef?.current;
    if (buttonRefObj && buttonRefObj.name === "avatar") {
      buttonRefObj.click();
    }
  };

  switch (props.fieldType) {
    case "input":
      return (
        <div className={styles.horzFieldWrapper}>
          <h4 className={styles.horzFieldLabel}>{props.label}</h4>
          <div className={styles.horzField}>
            <input
              className={`${styles.horzInput} ${
                props.type === "file" ? "hidden" : ""
              }`}
              ref={props.innerRef}
              name={props.name}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              type={props.type}
              required={props.required}
            />
            {props.type !== "file" ? null : (
              <>
                <button
                  className={styles.horzSelectFileBtn}
                  onClick={handleFileInput}
                  type="button"
                  name="choose-file"
                >
                  Choose File
                </button>
                <p className={styles.horzFileName}>
                  {props.fileName !== "" ? props.fileName : "No file chosen"}
                </p>
              </>
            )}
          </div>
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
