import React, { FC } from "react";
import {
  InputProps,
  TextareaProps,
} from "../../../interfaces/forum/post/form-field";
import { CheckCircle, CloseCircle } from "../../icons/icons";
import styles from "./BaseField.module.css";

const BaseField: FC<InputProps | TextareaProps> = (props) => {
  switch (props.fieldType) {
    case "input":
      return (
        <div className={styles.baseFieldWrapper}>
          {props.label && (
            <div className={styles.baseFieldLabelWrapper}>
              <h3
                className={`${styles.baseFieldLabel} ${
                  props.isLightMode
                    ? styles.baseFieldLabelLight
                    : styles.baseFieldLabelDark
                }`}
              >
                {props.label}
              </h3>
              {props.isRegrex &&
                props.value !== "" &&
                (props.isValid ? (
                  <CheckCircle className={styles.baseFieldIcon} />
                ) : (
                  <CloseCircle className={styles.baseFieldIcon} />
                ))}
            </div>
          )}
          <input
            className={`${styles.baseFieldInput} ${
              props.isLightMode ? styles.baseFieldLight : styles.baseFieldDark
            }`}
            ref={props.innerRef}
            name={props.name}
            value={props.value}
            defaultValue={props.defaultValue}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            required={props.required}
          ></input>
        </div>
      );
    case "textarea":
      return (
        <div className={styles.baseFieldWrapper}>
          {props.label && (
            <div className={styles.baseFieldLabelWrapper}>
              <h3
                className={`${styles.baseFieldLabel} ${
                  props.isLightMode
                    ? styles.baseFieldLabelLight
                    : styles.baseFieldLabelDark
                }`}
              >
                {props.label}
              </h3>
            </div>
          )}
          <textarea
            className={`${styles.baseFieldInput} ${
              props.isLightMode ? styles.baseFieldLight : styles.baseFieldDark
            }`}
            ref={props.innerRef}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
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

export default BaseField;
