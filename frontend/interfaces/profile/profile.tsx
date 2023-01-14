import ProjectInterface from "./project";
import RefLinksInterface from "./ref-links";

export default interface ProfileInterface extends RefLinksInterface {
  pid: string,
  profileName: string;
  avatar: string;
  about: string;
  projects: ProjectInterface[];
}
