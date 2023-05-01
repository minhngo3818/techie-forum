import React, { useState, useCallback, useEffect, useRef } from "react";
import { StateDuo } from "../../../interfaces/utils/button";
import BaseField from "../field-base/base-field";
import ProjectInterface from "../../../interfaces/project/project";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";
import PopupLayout from "../../utils/popup-layout/popup-layout";

interface ProjectFormType {
  headerTitle?: string;
  icon?: string;
  handleIsShow: StateDuo;
  handleSubmit: () => void;
  project?: ProjectInterface;
}

export default function ProjectForm(props: ProjectFormType) {
  const [project, setProject] = useState<ProjectInterface>(
    props.project
      ? props.project
      : {
          id: "0",
          title: "",
          summary: "",
          demo: "",
          repo: "",
        }
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const demoRef = useRef<HTMLInputElement>(null);
  const repoRef = useRef<HTMLInputElement>(null);

  const handleChangeProject = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setProject((project) => ({ ...project, [name]: value }));
    },
    []
  );

  return (
    <PopupLayout
      headerTitle={props.headerTitle}
      icon={props.icon}
      handleShow={props.handleIsShow}
      handleSubmit={props.handleSubmit}
    >
      <React.Fragment>
        <BaseField
          label="Project Title"
          name="project-title"
          type="text"
          isLightMode={true}
          innerRef={titleRef}
          placeholder="title....."
          defaultValue={project.title}
          onChange={handleChangeProject}
          fieldType="input"
        />
        <BaseField
          label="Summary"
          name="project-summary"
          type="text"
          isLightMode={true}
          innerRef={summaryRef}
          placeholder="summary....."
          defaultValue={project.summary}
          onChange={handleChangeProject}
          fieldType="input"
        />
        <BaseField
          label="Demo"
          name="project-demo"
          type="text"
          isLightMode={true}
          innerRef={demoRef}
          placeholder="demo url....."
          defaultValue={project.demo}
          onChange={handleChangeProject}
          fieldType="input"
        />
        <BaseField
          label="Repo"
          name="project-repo"
          type="text"
          isLightMode={true}
          innerRef={repoRef}
          placeholder="repo url....."
          defaultValue={project.repo}
          onChange={handleChangeProject}
          fieldType="input"
        />
      </React.Fragment>
    </PopupLayout>
  );
}
