import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Box from "../../utils/box/box";
import Project from "./project/project";
const ProjectForm = dynamic(
  () => import("../../form/form-project/project-form")
);
import IProject from "../../../interfaces/project/project";
import styles from "./ProfilePorfolio.module.css";
import { AddSquare } from "../../icons/icons";

function ProfilePorfolio(props: {
  isSameUser: boolean;
  projects?: IProject[];
}) {
  const [projects, setProjects] = useState<IProject[]>(props.projects || []);
  const [isAddProject, setIsAddProject] = useState(false);

  const handleIsAddProject = useCallback(() => {
    setIsAddProject((isAddProject) => !isAddProject);
  }, []);

  return (
    <Box width={960} height={400} borderWidth={1} clipType="clip-cyber-left">
      <div className={styles.porContainer}>
        <div className={styles.porTitleWrapper}>
          <h3 className={styles.porTitle}>Porfolio</h3>
          {/* Add loading bar */}
        </div>
        <div className={styles.porProjects}>
          {projects.map((project, index) => {
            return (
              <Project
                isSameUser={props.isSameUser}
                key={index}
                id={`${project.id}`}
                title={project.title}
                summary={project.summary}
                repo={project.repo}
                demo={project.demo}
              />
            );
          })}
        </div>
        {!props.isSameUser ? null : (
          <React.Fragment>
            <div className={styles.porAddButtonWrapper}>
              <button
                className={styles.porAddButton}
                onClick={handleIsAddProject}
              >
                <AddSquare className="mx-2 text-lg" />
                Add Project
              </button>
            </div>
            <ProjectForm
              headerTitle="ADD PROJECT"
              icon="robot"
              handleIsShow={{
                isState: isAddProject,
                setState: handleIsAddProject,
              }}
            />
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
export default ProfilePorfolio;
