import React, { ReactElement } from "react";
import { StateDuo } from "@interfaces/utils/button";
import { Dialog, Transition } from "@headlessui/react";
import useCurrentScollY from "@hooks/useCurrentScrollY";
import PopupButtons from "./popup-buttons";
import {
  Delete,
  Edit,
  Robot,
  Warning,
  AboutAdmin,
  FramePerson,
} from "@components/icons/icons";
import styles from "./PopupLayout.module.css";

interface PopupLayoutType {
  handleShow: StateDuo;
  headerTitle?: string;
  handleSubmit?: () => void;
  icon?: string;
  submitBtnName?: string;
  children: ReactElement;
}

export default function PopupLayout(props: PopupLayoutType) {
  const [scrollY] = useCurrentScollY();

  // Add icon to the dictionary if it will be used
  const icons: { [key: string]: JSX.Element } = {
    edit: <Edit />,
    robot: <Robot />,
    warning: <Warning />,
    delete: <Delete />,
    about: <AboutAdmin />,
    person: <FramePerson />,
  };

  return (
    <Transition show={props.handleShow.isState}>
      <Dialog
        open={props.handleShow.isState}
        onClose={props.handleShow.setState}
      >
        <Dialog.Panel
          className={styles.popupContainer}
          style={{ top: scrollY }}
        >
          <Dialog.Overlay className={styles.popupBG}></Dialog.Overlay>
          <Transition.Child
            className={styles.popupPopup}
            enter="transition-all ease duration-300"
            enterFrom="opacity-0 -translate-y-1/2"
            enterTo="opacity-100 -translate-y-1/4"
            leave="transition-all duration-300"
            leaveFrom="opacity-100 -translate-y-1/4"
            leaveTo="opacity-0 -translate-y-1/2"
          >
            <Dialog.Title as="div" className={styles.popupHeader}>
              {props.icon ? icons[props.icon.toLowerCase()] : null}
              <h3 className="ml-2">{props.headerTitle}</h3>
            </Dialog.Title>
            <div className={styles.popupFields}>{props.children}</div>
            <PopupButtons
              submitName={props.submitBtnName}
              handleShow={props.handleShow}
              handleSubmit={props.handleSubmit}
            />
          </Transition.Child>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
