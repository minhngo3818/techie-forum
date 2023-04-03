import React, { useState } from "react";
import { useQuery } from "react-query";
import ProfileAbout from "../../components/profile/about/profile-about";
import ProfileGeneral from "../../components/profile/general/profile-general-info";
import ProfilePorfolio from "../../components/profile/porfolio/profile-porfolio";
import { ProfileInterface } from "../../interfaces/profile/profile";

function Profile() {
  const sampleProfile: ProfileInterface = {
    id: "asdjkalkdjqw",
    profileName: "Made In Heaven",
    avatar: "/made-in-heaven.jpg",
    twitter: "https://twitter.com/konstancetine",
    github: "https://github.com/konstancetine",
    stackoverflow: "https://stackoverflow/konstancetine",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, p\
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco\
    laboris nisi ut aliquip ex ea commodo consequat. \
    Duis aute irure dolor in reprehenderit in voluptate \
    velit esse cillum dolore eu fugiat nulla pariatur. ",
    threadCounts: 0,
    commentCounts: 0,
    likeCounts: 0,
    projects: [
      {
        id: "1",
        title: "Ooga Boogga",
        summary:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        demo: "https://dummyaijsdhfhsd.com",
        repo: "https://github.com/giornodiobrando/",
      },
      {
        id: "2",
        title: "Tarnish of Westernland",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        demo: "https://dummyaijsdhfhsd.com",
        repo: "https://github.com/giornodiobrando/",
      },
    ],
  };

  const [profile, setProfile] = useState<ProfileInterface>(sampleProfile);

  const handleChangeProfile = () => {};

  const handleSubmitProfile = () => {};

  return (
    <div className="w-screen h-full flex flex-col justify-start items-center p-20">
      <ProfileGeneral
        profileName={sampleProfile.profileName}
        avatar={sampleProfile.avatar}
        twitter={sampleProfile.twitter}
        github={sampleProfile.github}
        stackoverflow={sampleProfile.stackoverflow}
        threadsCount={20}
        commentsCount={50}
        reputationsCount={80}
        handleChange={handleChangeProfile}
        handleSubmit={handleSubmitProfile}
      />
      <ProfileAbout about={sampleProfile.about} />
      <ProfilePorfolio projects={sampleProfile.projects} />
    </div>
  );
}
export default Profile;
