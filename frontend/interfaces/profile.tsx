import ProjectInterface from "./project";
import RefLinksInterface from "./refLinks";

export default interface ProfileInterface extends RefLinksInterface {
  name: string;
  avatar: string;
  about: string;
  projects: Array<ProjectInterface>;
}
