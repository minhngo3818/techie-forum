import { useState } from "react";
import dynamic from "next/dynamic";
import AuthGuard from "../../services/auth/AuthGuard";
import PageHeader from "../../components/page-header/PageHeader";
const ProfileHeader = dynamic(() =>
  import("../../components/profile/header/ProfileHeader")
);
const ProfileBio = dynamic(() =>
  import("../../components/profile/bio/ProfileBio")
);
const ProfilePorfolio = dynamic(() =>
  import("../../components/profile/porfolio/ProfilePorfolio")
);
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <ProfileHeader />
      <ProfileBio />
      <ProfilePorfolio />
    </div>
  );
};

export default AuthGuard(Profile);
