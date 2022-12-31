import { useState, useCallback } from "react";
import Box from "../../utils/box/box";
import Project from "./project/project";
import ProjectForm from "../../form/form-project/project-form";
import ProjectInterface from "../../../interfaces/project";
import styles from "./Porfolio.module.css";
import { TypeFlags } from "typescript";
import { AddSquare } from "../../icons/icons";

function ProfilePorfolio(props: { projects?: ProjectInterface[] }) {
  const [projects, setProjects] = useState<ProjectInterface[]>(
    props.projects || []
  );
  const [isAddProject, setIsAddProject] = useState(false);

  const handleIsAddProject = useCallback(() => {
    setIsAddProject((isAddProject) => !isAddProject);
  }, []);

  const handleAddProject = useCallback(() => {}, []);

  const handleRemoveProject = useCallback(() => {}, []);

  const handleEditProject = useCallback(() => {}, []);

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
                key={index}
                id={index}
                title={project.title}
                summary={project.summary}
                repo={project.repo}
                demo={project.demo}
                handleEditProject={handleEditProject}
                handleRemoveProject={handleRemoveProject}
              />
            );
          })}
        </div>
        <div className={styles.porAddButtonWrapper}>
          <button className={styles.porAddButton} onClick={handleIsAddProject}>
            <AddSquare className="mx-2 text-lg" />
            Add Project
          </button>
        </div>
        <ProjectForm
          headerTitle="ADD PROJECT"
          icon="robot"
          handleIsShow={{ isState: isAddProject, setState: handleIsAddProject }}
          handleSubmit={handleAddProject}
        />
      </div>
    </Box>
  );
}
export default ProfilePorfolio;
