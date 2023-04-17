import React from "react";
import ProjectInterface from "../../../../interfaces/project/project";
import ProjectTitle from "./title/project-title";
import ProjectSummary from "./summary/project-sumary";
import ProjectLink from "./link/project-link";
import ProjectBtnEdit from "./buttons/project-btn-edit";
import ProjectBtnRemove from "./buttons/project-btn-remove";
import styles from "./Project.module.css";

interface ProjectComponentType extends ProjectInterface {
  isSameUser: boolean;
  handleEditProject: () => void;
  handleRemoveProject: () => void;
}

export default function Project(props: ProjectComponentType) {
  return (
    <div className={styles.project}>
      <div className={styles.projectLargeCol}>
        <ProjectTitle title={props.title} />
        <div className={styles.projectContentWrapper}>
          <div className={styles.projectRow}>
            <ProjectSummary summary={props.summary} />
          </div>
          <div className={styles.projectRow}>
            <ProjectLink name="Demo" link={props.demo} />
            <ProjectLink name="Repo" link={props.repo} />
          </div>
        </div>
      </div>
      {!props.isSameUser ? null : (
        <div className={styles.projectNarrowCol}>
          <ProjectBtnEdit
            id={props.id}
            title={props.title}
            summary={props.summary}
            demo={props.demo}
            repo={props.repo}
            handleEditProject={props.handleEditProject}
          />
          <ProjectBtnRemove
            id={props.id ?? ""}
            handleRemove={props.handleRemoveProject}
          />
        </div>
      )}
    </div>
  );
}
