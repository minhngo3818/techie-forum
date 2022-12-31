import ProfileAbout from "../../components/profile/about/about";
import ProfileGeneral from "../../components/profile/general/general";
import ProfilePorfolio from "../../components/profile/porfolio/porfolio";

function Profile() {
  const about =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, p\
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
  Ut enim ad minim veniam, quis nostrud exercitation ullamco\
  laboris nisi ut aliquip ex ea commodo consequat. \
  Duis aute irure dolor in reprehenderit in voluptate \
  velit esse cillum dolore eu fugiat nulla pariatur. ";

  const projects = [
    {
      id: 1,
      title: "Ooga Boogga",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      demo: "https://dummyaijsdhfhsd.com",
      repo: "https://github.com/giornodiobrando/",
    },
    {
      id: 2,
      title: "Tarnish of Westernland",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      demo: "https://dummyaijsdhfhsd.com",
      repo: "https://github.com/giornodiobrando/",
    },
  ];

  return (
    <div className="w-screen h-full flex flex-col justify-start items-center p-20">
      <ProfileGeneral />
      <ProfileAbout about={about} />
      <ProfilePorfolio projects={projects} />
    </div>
  );
}
export default Profile;
