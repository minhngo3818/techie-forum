import React, { useState, useCallback, useEffect, useRef } from "react";
import { StateDuo } from "../../../interfaces/utils/button";
import BaseField from "../field-base/base-field";
import ProjectInterface from "../../../interfaces/profile/project";
import { EventTargetNameValue } from "../../../interfaces/forum/post/form-field";
import PopupLayout from "../../utils/popup-layout/popup-layout";
import styles from "./ProjectForm.module.css";

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
          id: 0,
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

// <Transition show={props.handleIsAdd.isState}>
//   <Dialog
//     open={props.handleIsAdd.isState}
//     onClose={props.handleIsAdd.setState}
//   >
//     <Dialog.Panel
//       className={styles.projectFormContainer}
//       style={{ top: scrollY }}
//     >
//       <Dialog.Overlay className={styles.projectFormBG}></Dialog.Overlay>
//       <Transition.Child
//         className={styles.projectFormPopup}
//         enter="transition-all ease duration-300"
//         enterFrom="opacity-0 -translate-y-1/2"
//         enterTo="opacity-100 -translate-y-1/4"
//         leave="transition-all duration-300"
//         leaveFrom="opacity-100 -translate-y-1/4"
//         leaveTo="opacity-0 -translate-y-1/2"
//       >
//         <Dialog.Title className={styles.projectFormHeader}>
//           <Robot />
//           <h3 className="ml-2">ADD PROJECT</h3>
//         </Dialog.Title>
//         <div className={styles.projectFormFields}>
//           <BaseField
//             label="Project Title"
//             name="project-title"
//             type="text"
//             isLightMode={true}
//             innerRef={titleRef}
//             placeholder="title....."
//             defaultValue={project.title}
//             onChange={handleChangeProject}
//             fieldType="input"
//           />
//           <BaseField
//             label="Summary"
//             name="project-summary"
//             type="text"
//             isLightMode={true}
//             innerRef={summaryRef}
//             placeholder="summary....."
//             defaultValue={project.summary}
//             onChange={handleChangeProject}
//             fieldType="input"
//           />
//           <BaseField
//             label="Demo"
//             name="project-demo"
//             type="text"
//             isLightMode={true}
//             innerRef={demoRef}
//             placeholder="demo url....."
//             defaultValue={project.demo}
//             onChange={handleChangeProject}
//             fieldType="input"
//           />
//           <BaseField
//             label="Repo"
//             name="project-repo"
//             type="text"
//             isLightMode={true}
//             innerRef={repoRef}
//             placeholder="repo url....."
//             defaultValue={project.repo}
//             onChange={handleChangeProject}
//             fieldType="input"
//           />
//         </div>
//         <div className={styles.projectFormButtons}>
//           <button
//             className={`${styles.projectFormButton} ${styles.projectFormSubmit}`}
//             onClick={props.handleAddProject}
//           >
//             Submit
//           </button>
//           <button
//             className={`${styles.projectFormButton} ${styles.projectFormCancel}`}
//             onClick={props.handleIsAdd.setState}
//           >
//             Cancel
//           </button>
//         </div>
//       </Transition.Child>
//     </Dialog.Panel>
//   </Dialog>
// </Transition>
