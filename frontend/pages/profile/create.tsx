import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PageTitle from "../../components/utils/page-title/page-title";
import { ProfileCreationInterface } from "../../interfaces/profile/profile";
import ProjectInterface from "../../interfaces/project/project";
import {
  EventTargetNameValue,
  FormEvent,
} from "../../interfaces/forum/form/form-field";
import { useMutation } from "react-query";
import { createProfile } from "../../services/user/profile/profile-services";
import { AxiosError } from "axios";
const BasicInfo = dynamic(
  () =>
    import("../../components/form/form-profile-creation/basic-info/basic-info"),
  { ssr: false }
);
const Reference = dynamic(
  () =>
    import("../../components/form/form-profile-creation/reference/reference"),
  { ssr: false }
);
const Project = dynamic(
  () => import("../../components/form/form-profile-creation/project/project"),
  { ssr: false }
);
const Submission = dynamic(
  () =>
    import("../../components/form/form-profile-creation/submission/submission"),
  { ssr: false }
);
import { Tab } from "@headlessui/react";
import useMultistepForm from "../../hooks/useMultistepForm";
import { FadeLoader } from "react-spinners";
import styles from "../../styles/ProfileCreation.module.css";
import useAuth from "../../services/auth/auth-provider";

//  Empty data objects
const emptyProject: ProjectInterface = {
  title: "",
};

const emptyProfile: ProfileCreationInterface = {
  projects: [emptyProject],
};

export default function ProfileCreation() {
  const { user } = useAuth();
  const router = useRouter();

  // Tabs
  let tabs = ["Info", "Links", "Projects", "Submission"];
  const { currentIndex, next, prev, goTo } = useMultistepForm(tabs);
  const tabRef = useRef<HTMLButtonElement>(null);

  // Data
  const [profile, setProfile] = useState<ProfileCreationInterface>({
    profile_name: user?.username,
    projects: [emptyProject],
  });

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.focus();
    }
  }, [currentIndex]);

  const {
    mutate: performCreateProfile,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation(createProfile);

  // Data handlers
  /**
   * Update profile inputs, exclude projects
   */
  const handleChangeProfile = ({
    target: { name, value },
  }: EventTargetNameValue) => {
    setProfile((object) => ({ ...object, [name]: value }));
  };

  /**
   * Add an empty project to the project list of profile
   */
  const handleAddProject = useCallback(
    (id: string) => {
      let newProjectList = [...(profile.projects ?? [])];
      newProjectList.push(emptyProject);
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  /**
   * Remove a project by rendered id
   */
  const handleRemoveProject = useCallback(
    (index: number) => {
      console.log(index);
      let newProjectList = [...(profile.projects ?? [])];
      console.log(newProjectList);
      newProjectList.splice(index, 1);
      console.log(newProjectList);
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  /**
   * Change the input of a project corresponding to its id
   */
  const handleChangeProject = useCallback(
    (index: number, { target: { name, value } }: EventTargetNameValue) => {
      let newProjectList = [
        ...(profile.projects ?? []),
      ] as Array<ProjectInterface>;
      newProjectList[index] = { ...newProjectList[index], [name]: value };
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performCreateProfile(profile);
  };

  if (isLoading) {
    return (
      <div className={styles.veNoneSuccessWrapper}>
        <FadeLoader color="#ffffff" />
      </div>
    );
  }

  if (isError) {
    let resError = error as AxiosError;
    return (
      <div className={styles.veNoneSuccessWrapper}>
        <h2 className={styles.veText}>{resError?.message}</h2>
      </div>
    );
  }

  return (
    <div className={styles.procreWrapper}>
      <div className={styles.procreTitle}>
        <PageTitle title="Create Profile" />
      </div>
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
            name={profile.profile_name ?? ""}
            about={profile.about ?? ""}
            avatar={profile.avatar ?? ""}
            onChange={handleChangeProfile}
            nextTab={next}
          />
          <Reference
            isShow={currentIndex === 1}
            twitter={profile.twitter ?? ""}
            linkedin={profile.linkedin ?? ""}
            indeed={profile.indeed ?? ""}
            github={profile.github ?? ""}
            reddit={profile.reddit ?? ""}
            stackoverflow={profile.stackoverflow ?? ""}
            onChange={handleChangeProfile}
            nextTab={next}
            prevTab={prev}
          />
          <Project
            isShow={currentIndex === 2}
            projects={profile.projects ?? []}
            onAdd={handleAddProject}
            onRemove={handleRemoveProject}
            onChange={handleChangeProject}
            nextTab={next}
            prevTab={prev}
          />
          <Submission isShow={currentIndex === 3} />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
