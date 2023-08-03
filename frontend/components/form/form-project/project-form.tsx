import React, { useState, useCallback, useRef } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { StateDuo } from "../../../interfaces/utils/button";
import BaseField from "../field-base/base-field";
import IProject from "../../../interfaces/project/project";
import {
  createProjectService,
  updateProjectService,
} from "../../../services/user/project/project-service";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";
import PopupLayout from "../../utils/popup-layout/popup-layout";

interface ProjectFormType {
  headerTitle?: string;
  icon?: string;
  handleIsShow: StateDuo;
  project?: IProject;
}

export default function ProjectForm(props: ProjectFormType) {
  const [project, setProject] = useState<IProject>(
    props.project
      ? props.project
      : ({
          title: "",
          summary: "",
          demo: "",
          repo: "",
        } as IProject)
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

  const handleSubmit = async () => {
    if (!project.id) {
      console.log("No id", project);
      await createProjectService(project);
    } else {
      console.log(project);
      await updateProjectService(project);
    }
    setTimeout(() => {
      Router.reload();
    }, 1500);
  };

  return (
    <PopupLayout
      headerTitle={props.headerTitle}
      icon={props.icon}
      handleShow={props.handleIsShow}
      handleSubmit={handleSubmit}
    >
      <React.Fragment>
        <BaseField
          label="Project Title"
          name="title"
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
          name="summary"
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
          name="demo"
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
          name="repo"
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
