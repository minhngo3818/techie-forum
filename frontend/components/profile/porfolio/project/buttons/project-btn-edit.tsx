import React, { useState } from "react";
import dynamic from "next/dynamic";
import IProject from "../../../../../interfaces/project/project";
import { Edit } from "../../../../icons/icons";
import { Tooltip } from "react-tooltip";
const ProjectForm = dynamic(
  () => import("../../../../form/form-project/project-form")
);
import "node_modules/react-tooltip/dist/react-tooltip.css";
import styles from "./ProjectButton.module.css";

export default function ProjectBtnEdit(project: IProject) {
  const [isForm, setIsForm] = useState(false);

  const handleIsForm = () => {
    setIsForm((isForm) => !isForm);
  };

  return (
    <div className={styles.projectButtonWrapper}>
      <button
        id={`project-edit-${project.id}`}
        className={styles.projectButton}
        onClick={handleIsForm}
        data-tooltip-id={`project-edit-${project.id}`}
        data-tooltip-content="Edit"
      >
        <Edit />
        <Tooltip id={`project-edit-${project.id}`} />
      </button>
      <ProjectForm
        headerTitle="EDIT PROJECT"
        icon="edit"
        project={project}
        handleIsShow={{ isState: isForm, setState: handleIsForm }}
      />
    </div>
  );
}
