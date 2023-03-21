import React from "react";
import { StateDuo } from "../../../interfaces/utils/button";
import styles from "./PopupLayout.module.css";

interface PopupButtonsType {
  submitName?: string;
  handleShow: StateDuo;
  handleSubmit?: () => void;
}

export default function PopupButtons(props: PopupButtonsType) {
  return (
    <div className={styles.popupButtons}>
      <button
        className={`${styles.popupButton} ${styles.popupSubmit}`}
        onClick={props.handleSubmit}
      >
        {props.submitName ? props.submitName : "Submit"}
      </button>
      <button
        className={`${styles.popupButton} ${styles.popupCancel}`}
        onClick={props.handleShow.setState}
      >
        Cancel
      </button>
    </div>
  );
}
