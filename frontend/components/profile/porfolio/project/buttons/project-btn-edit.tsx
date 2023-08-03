import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import IProject from "../../../../../interfaces/project/project";
import { Edit } from "../../../../icons/icons";
import { Tooltip } from "react-tooltip";
const ProjectForm = dynamic(
  () => import("../../../../form/form-project/project-form")
);
import "node_modules/react-tooltip/dist/react-tooltip.css";
import styles from "./ProjectButton.module.css";

interface EditBtnType extends IProject {
  handleEditProject: () => void;
}

export default function ProjectBtnEdit(props: EditBtnType) {
  const [isForm, setIsForm] = useState(false);
  const [project, setProject] = useState<IProject>({
    title: props.title,
    summary: props.summary,
    demo: props.demo,
    repo: props.repo,
  } as IProject);

  const handleIsForm = useCallback(() => {
    setIsForm((isForm) => !isForm);
  }, []);

  const handleSubmitEdit = () => {};

  return (
    <div className={styles.projectButtonWrapper}>
      <button
        id={`project-edit-${props.id}`}
        className={styles.projectButton}
        onClick={handleIsForm}
        data-tooltip-id={`project-edit-${props.id}`}
        data-tooltip-content="Edit"
      >
        <Edit />
        <Tooltip id={`project-edit-${props.id}`} />
      </button>
      <ProjectForm
        headerTitle="EDIT PROJECT"
        icon="edit"
        project={project}
        handleIsShow={{ isState: isForm, setState: handleIsForm }}
        handleSubmit={handleSubmitEdit}
      />
    </div>
  );
}
