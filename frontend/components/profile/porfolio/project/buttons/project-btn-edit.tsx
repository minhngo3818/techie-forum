import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import ProjectInterface from "../../../../../interfaces/project";
import { Edit } from "../../../../icons/icons";
import { Tooltip } from "react-tooltip";
const ProjectForm = dynamic(
  () => import("../../../../form/form-project/project-form")
);
import "node_modules/react-tooltip/dist/react-tooltip.css";
import styles from "./ProjectButton.module.css";

interface EditBtnType extends ProjectInterface {
  handleEditProject: () => void;
}

export default function ProjectBtnEdit(props: EditBtnType) {
  const [isForm, setIsForm] = useState(false);
  const [project, setProject] = useState<ProjectInterface>({
    title: props.title,
    summary: props.summary,
    demo: props.demo,
    repo: props.repo,
  } as ProjectInterface);

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
      >
        <Edit />
        <Tooltip
          anchorId={`project-edit-${props.id}`}
          content="Edit"
          events={["hover"]}
        />
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
