import React from "react";
import ProfileAbout from "../../components/profile/about/profile-about";
import ProfileGeneral from "../../components/profile/general/profile-general-info";
import ProfilePorfolio from "../../components/profile/porfolio/profile-porfolio";
import { ProfileInterface } from "../../interfaces/profile/profile";
import { getProfile } from "../../services/user/profile/profile-services";
import { GetServerSidePropsContext } from "next";
import useAuth from "../../services/auth/auth-provider";

function Profile(data: ProfileInterface) {
  const { user } = useAuth();
  let profile = data;
  let isSameUser = profile.profile_name === user?.profile_name;

  return (
    <div className="w-screen h-full flex flex-col justify-start items-center p-20">
      <ProfileGeneral
        isSameUser={isSameUser}
        id={profile.id}
        profile_name={profile.profile_name}
        avatar={profile.avatar}
        twitter={profile.twitter ?? ""}
        linkedin={profile.linkedin ?? ""}
        indeed={profile.indeed ?? ""}
        reddit={profile.reddit ?? ""}
        github={profile.github ?? ""}
        stackoverflow={profile.stackoverflow ?? ""}
        threadCounts={profile.threadCounts ?? 0}
        commentCounts={profile.commentCounts ?? 0}
        likeCounts={profile.likeCounts ?? 0}
      />
      <ProfileAbout
        about={profile.about}
        profileName={profile.profile_name}
        isSameUser={isSameUser}
      />
      <ProfilePorfolio projects={profile.projects} isSameUser={isSameUser} />
    </div>
  );
}
export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { name } = context.query; // profile_name
  const response = await getProfile(`${name}`);
  const data = await response.data;
  return { props: data };
}
