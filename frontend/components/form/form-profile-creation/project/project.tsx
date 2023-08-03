import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  ChangeEvent,
} from "react";
import IProject from "../../../../interfaces/project/project";
import ProjectInner from "./project-inner";
import { Tab, Transition } from "@headlessui/react";
import { Delete } from "../../../icons/icons";
import { CaretLeftFilled, CaretRightFilled } from "../../../icons/icons";
import generalStyles from "../ProfileCreationForm.module.css";
import styles from "./Project.module.css";

interface ProjectsType {
  isShow: boolean;
  projects: IProject[];
  onAdd: (id: string) => void;
  onChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRemove: (index: number) => void;
  nextTab: () => void;
  prevTab: () => void;
}

export default function Project(props: ProjectsType) {
  const [idIncrement, setIncrement] = useState(2);

  const handleAddProject = () => {
    props.onAdd(`${idIncrement}`);
    setIncrement(idIncrement + 1);
  };

  return (
    <Tab.Panel as="div">
      <Transition
        as="div"
        appear
        show={props.isShow}
        enter="transition-all duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={generalStyles.procrePanel}>
          <div className={generalStyles.procrePanelWrapper}>
            {props.projects.map((project, index) => {
              return (
                <div className={styles.projectWrapper} key={index}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectHeaderTitle}>
                      Project {index + 1}
                    </h3>
                    {index !== 0 && (
                      <button
                        type="button"
                        className={styles.projectDeleteBtn}
                        onClick={() => props.onRemove(index)}
                      >
                        <Delete className="text-lg" />
                      </button>
                    )}
                  </div>
                  <Transition.Child
                    as="div"
                    className="w-full"
                    enter="transition-all delay-100 duration-300"
                    enterFrom="opacity-0 scale-0"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-0"
                  >
                    <ProjectInner
                      index={index}
                      title={project.title}
                      summary={project.summary}
                      demo={project.demo}
                      repo={project.repo}
                      onChange={props.onChange}
                    />
                  </Transition.Child>
                </div>
              );
            })}
            <div className={styles.projectBtnWrapper}>
              <button
                type="button"
                className={styles.projectAddBtn}
                onClick={handleAddProject}
              >
                Add Project
              </button>
            </div>
          </div>
          <div className={generalStyles.procreChangeTabWrapper}>
            <button
              className={generalStyles.procreChangeTabBtn}
              onClick={props.prevTab}
            >
              <CaretLeftFilled className={generalStyles.procreChangeTabIcon} />
              Prev
            </button>
            <button
              className={generalStyles.procreChangeTabBtn}
              onClick={props.nextTab}
            >
              Next
              <CaretRightFilled className={generalStyles.procreChangeTabIcon} />
            </button>
          </div>
        </div>
      </Transition>
    </Tab.Panel>
  );
}
