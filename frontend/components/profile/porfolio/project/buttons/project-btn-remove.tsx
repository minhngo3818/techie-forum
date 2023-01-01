import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Delete } from "../../../../icons/icons";
import { Tooltip } from "react-tooltip";
const PopupLayout = dynamic(
  () => import("../../../../utils/popup-layout/popup-layout")
);
import "node_modules/react-tooltip/dist/react-tooltip.css";
import styles from "./ProjectButton.module.css";

interface RemoveBtnType {
  id: number;
  handleRemove: () => void;
}

export default function ProjectBtnRemove(props: RemoveBtnType) {
  const [isForm, setIsForm] = useState(false);

  const handleIsForm = useCallback(() => {
    console.log(isForm);
    setIsForm((isForm) => !isForm);
  }, [isForm]);

  return (
    <div className={styles.projectButtonWrapper}>
      <button
        id={`project-remove-${props.id}`}
        className={styles.projectButton}
        onClick={handleIsForm}
      >
        <Delete />
        <Tooltip
          anchorId={`project-remove-${props.id}`}
          content="Remove"
          events={["hover"]}
        />
      </button>
      <PopupLayout
        headerTitle="REMOVE PROJECT"
        icon="delete"
        submitBtnName="REMOVE"
        handleShow={{ isState: isForm, setState: handleIsForm }}
        handleSubmit={props.handleRemove}
      >
        <p>
          Are you sure you want to <strong>remove</strong> project?
        </p>
      </PopupLayout>
    </div>
  );
}
