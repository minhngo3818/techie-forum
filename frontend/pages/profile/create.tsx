import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import PageTitle from "../../components/utils/page-title/page-title";
import { IProfileForm } from "../../interfaces/profile/profile";
import IProject from "../../interfaces/project/project";
import {
  EventTargetNameValue,
  FormEvent,
} from "../../interfaces/forum/form/form-field";
import { useMutation } from "react-query";
import { createProfile } from "../../services/user/profile/profile-services";
import { AxiosError } from "axios";
import useAuth from "../../services/auth/auth-provider";
import useMultistepForm from "../../hooks/useMultistepForm";
import { Tab } from "@headlessui/react";
import { FadeLoader } from "react-spinners";
import styles from "../../styles/ProfileCreation.module.css";
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

//  Empty data objects
const emptyProject: IProject = {
  title: "",
};

export default function ProfileCreation() {
  const { user } = useAuth();

  // Tabs
  let tabs = ["Info", "Links", "Projects", "Submission"];
  const { currentIndex, next, prev, goTo } = useMultistepForm(tabs);
  const tabRef = useRef<HTMLButtonElement>(null);

  // Data
  const [profile, setProfile] = useState<IProfileForm>({
    profile_name: user?.username,
    projects: [emptyProject],
  });

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.focus();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (user?.username && !profile.profile_name) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profile_name: user.username,
      }));
    }
  }, [user]);

  const {
    mutate: performCreateProfile,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation(createProfile);

  const handleChangeProfile = ({
    target: { name, value },
  }: EventTargetNameValue) => {
    setProfile((object) => ({ ...object, [name]: value }));
  };

  const handleAddProject = useCallback(() => {
    let newProjectList = [...(profile.projects ?? [])];
    newProjectList.push(emptyProject);
    setProfile({ ...profile, projects: newProjectList });
  }, [profile]);

  const handleRemoveProject = useCallback(
    (index: number) => {
      let newProjectList = [...(profile.projects ?? [])];
      newProjectList.splice(index, 1);
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  const handleChangeProject = useCallback(
    (index: number, { target: { name, value } }: EventTargetNameValue) => {
      let newProjectList = [...(profile.projects ?? [])] as Array<IProject>;
      newProjectList[index] = { ...newProjectList[index], [name]: value };
      setProfile({ ...profile, projects: newProjectList });
    },
    [profile]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    /**
     * TODO: solve set avatar file problem and send blob with data form
     * Error 1:click choose file will jump page
     */
    e.preventDefault();
    performCreateProfile(profile);
  };

  // RENDERING SIGNALS
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

  if (isSuccess) {
    setTimeout(() => {
      Router.push("/forum");
    }, 1200);
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
            avatar={profile.avatar ? (profile.avatar as string) : ""}
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
