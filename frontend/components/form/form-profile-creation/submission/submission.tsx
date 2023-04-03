import React from "react";
import { Tab, Transition } from "@headlessui/react";
import generalStyles from "../ProfileCreationForm.module.css";
import styles from "./Submission.module.css";
import { Diamond } from "../../../icons/icons";

interface SubmissionType {
  isShow: boolean;
}

export default function Submission(props: SubmissionType) {
  return (
    <Tab.Panel as="div">
      <Transition
        as="div"
        appear
        show={props.isShow}
        enter="transition-all duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={generalStyles.procrePanel}>
          <div className={styles.submitBg} />
          <Diamond className={styles.submitDiamond} />
          <div className={styles.submitWrapper}>
            <p className={styles.submitNotes}>
              -&gt; If you finish, click the Submit button
              <br />
              -&gt; If not, go back to previous pages to edit your profile by
              clicking to page name
            </p>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </div>
      </Transition>
    </Tab.Panel>
  );
}
