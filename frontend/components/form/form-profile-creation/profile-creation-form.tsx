import React, { useState, useRef, useEffect, useCallback } from "react";
import ProjectInterface from "../../../interfaces/profile/project";
import ProfileInterface from "../../../interfaces/profile/profile";
import BasicInfo from "./basic-info/basic-info";
import Reference from "./reference/reference";
import Submission from "./submission/submission";
import {
  EventTargetNameValue,
  FormEvent,
} from "../../../interfaces/forum/post/form-field";
import { Tab } from "@headlessui/react";
import useMultistepForm from "../../../hooks/useMultistepForm";
import styles from "./ProfileCreationForm.module.css";
import Project from "./project/project";

// TODO:
//    add next or prev buttons
//    handle crop avatar
//    add console.log demo request, remove any "" fields before sending data
const initialProject = {
  id: 1,
  title: "",
  summary: "",
  demo: "",
  repo: "",
};

const initialState: ProfileInterface = {
  profileName: "",
  about: "",
  avatar: "",
  twitter: "",
  linkedin: "",
  indeed: "",
  github: "",
  reddit: "",
  stackoverflow: "",
  projects: [initialProject],
};

function ProfileCreationForm() {
  // Tabs
  let tabs = ["Info", "Links", "Projects", "Submission"];
  const { currentIndex, next, prev, goTo } = useMultistepForm(tabs);
  const tabRef = useRef<HTMLButtonElement>(null);

  // Data
  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.focus();
    }
  }, []);

  const handleChangeProfile = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setProfile((object) => ({ ...object, [name]: value }));
    },
    []
  );

  const handleAddProject = useCallback(
    (id: number) => {
      let newProjectList = [...profile.projects];
      newProjectList.push({
        id: id,
        title: "",
        summary: "",
        demo: "",
        repo: "",
      });
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  const handleRemoveProject = useCallback(
    (id: number) => {
      let newProjectList = [...profile.projects];
      newProjectList = newProjectList.filter((item) => item.id !== id);
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  const handleChangeProject = useCallback(
    (id: number, { target: { name, value } }: EventTargetNameValue) => {
      let newProjectList = [...profile.projects] as Array<ProjectInterface>;
      let index = newProjectList.findIndex((item) => item.id === id);
      newProjectList[index] = { ...newProjectList[index], [name]: value };
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(profile);
      alert("Login request was sent");
    },
    [profile]
  );

  return (
    <Tab.Group selectedIndex={currentIndex} onChange={(index) => goTo(index)}>
      <Tab.List as="div" className={styles.procreTabs}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={index}
              ref={tabRef}
              className={({ selected }) =>
                `${styles.procreTab} ${
                  selected ? styles.procreTabActive : styles.procreTabInactive
                }`
              }
            >
              {tab}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels
        as="form"
        className={styles.procreForm}
        onSubmit={handleSubmit}
      >
        <BasicInfo
          isShow={currentIndex === 0}
          name={profile.profileName}
          about={profile.about}
          avatar={profile.avatar}
          onChange={handleChangeProfile}
          nextTab={next}
        />
        <Reference
          isShow={currentIndex === 1}
          twitter={profile.twitter}
          linkedin={profile.linkedin}
          indeed={profile.indeed}
          github={profile.github}
          reddit={profile.reddit}
          stackoverflow={profile.stackoverflow}
          onChange={handleChangeProfile}
          nextTab={next}
          prevTab={prev}
        />
        <Project
          isShow={currentIndex === 2}
          projects={profile.projects}
          onAdd={handleAddProject}
          onRemove={handleRemoveProject}
          onChange={handleChangeProject}
          nextTab={next}
          prevTab={prev}
        />
        <Submission isShow={currentIndex === 3} />
      </Tab.Panels>
    </Tab.Group>
  );
}

// ref in child component must use React.forwardRef
const ProfileCreationFormFwd = React.forwardRef(ProfileCreationForm);
export default ProfileCreationFormFwd;
