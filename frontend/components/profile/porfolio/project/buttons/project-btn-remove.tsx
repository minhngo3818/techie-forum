import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { deleteProjectService } from "../../../../../services/user/project/project-service";
import { Delete } from "../../../../icons/icons";
import { Tooltip } from "react-tooltip";
const PopupLayout = dynamic(
  () => import("../../../../utils/popup-layout/popup-layout")
);
import "node_modules/react-tooltip/dist/react-tooltip.css";
import styles from "./ProjectButton.module.css";

export default function ProjectBtnRemove(props: { id: string }) {
  const router = useRouter();

  const [isForm, setIsForm] = useState(false);

  const handleIsForm = useCallback(() => {
    console.log(isForm);
    setIsForm((isForm) => !isForm);
  }, [isForm]);

  const handleDeleteProject = async () => {
    try {
      await deleteProjectService(props.id);
      setTimeout(() => {
        router.reload();
      }, 1500);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.projectButtonWrapper}>
      <button
        id={`project-remove-${props.id}`}
        className={styles.projectButton}
        onClick={handleIsForm}
        data-tooltip-id={`project-edit-${props.id}`}
        data-tooltip-content="Edit"
      >
        <Delete />
        <Tooltip id={`project-remove-${props.id}`} />
      </button>
      <PopupLayout
        headerTitle="REMOVE PROJECT"
        icon="delete"
        submitBtnName="REMOVE"
        handleShow={{ isState: isForm, setState: handleIsForm }}
        handleSubmit={handleDeleteProject}
      >
        <p>
          Are you sure you want to <strong>remove</strong> project?
        </p>
      </PopupLayout>
    </div>
  );
}
