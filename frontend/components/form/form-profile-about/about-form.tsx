import React, { useState, useRef } from "react";
import Router from "next/router";
import { StateDuo } from "@interfaces/utils/button";
import BaseField from "../field-base/base-field";
import PopupLayout from "@components/utils/popup-layout/popup-layout";
import { updateProfile } from "@services/user/profile/profile-services";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";

interface AboutFormType {
  headerTitle?: string;
  icon?: string;
  handleIsShow: StateDuo;
  profileName?: string;
  about?: string;
}

export default function AboutForm(props: AboutFormType) {
  const [about, setAbout] = useState(props.about);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(aboutRef.current, about);

  const handleChangeAbout = () => {
    setAbout(aboutRef.current?.value);
  };

  const handleUpdateAbout = async () => {
    await updateProfile(props.profileName ?? "", { about: about });
    setTimeout(() => {
      props.handleIsShow.setState();
      Router.reload();
    }, 1500);
  };

  return (
    <PopupLayout
      headerTitle={props.headerTitle}
      icon={props.icon}
      handleShow={props.handleIsShow}
      handleSubmit={handleUpdateAbout}
    >
      <React.Fragment>
        <p>
          Your can write about your goals, achievements, skills, and interests.
          And even your experience in tech industry.
        </p>
        <BaseField
          name="about"
          innerRef={aboutRef}
          isLightMode={true}
          placeholder="about yourself....."
          value={about}
          defaultValue={props.about}
          onChange={handleChangeAbout}
          fieldType="textarea"
          cols={4}
          rows={10}
        />
      </React.Fragment>
    </PopupLayout>
  );
}
