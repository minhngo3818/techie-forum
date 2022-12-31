import React, { useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Warning } from "../../icons/icons";
import PopupLayout from "../../utils/popup-layout/popup-layout";
import styles from "../../../styles/Account.module.css";
import uniqueStyles from "./DeleteAccount.module.css";

export default function DeleteAccount() {
  const [isShow, setIsShow] = useState(false);

  const handleShow = useCallback(() => {
    setIsShow((isShow) => !isShow);
  }, []);

  return (
    <div className={styles.accountSection}>
      <h3 className={styles.accountSecTitle}>Delete Account</h3>
      <p className={styles.accountText}>
        You can recover your account by following steps in the follow-up email
      </p>
      <div className={styles.accountSecBtnWrapper}>
        <button
          className={`${styles.accountSecBtn} ${uniqueStyles.deleteSecBtnDelete}`}
          onClick={() => setIsShow(!isShow)}
        >
          Delete !
        </button>
      </div>
      <PopupLayout
        headerTitle="WARNING"
        icon="warning"
        submitBtnName="DELETE"
        handleShow={{ isState: isShow, setState: handleShow }}
      >
        <p className={uniqueStyles.deleteText}>
          Are you sure you want to <strong>delete</strong> account?
        </p>
      </PopupLayout>
    </div>
  );
}
