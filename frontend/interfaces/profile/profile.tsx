import ProjectInterface from "../project/project";
import RefLinksInterface from "./ref-links";

export default interface ProfileInterface extends RefLinksInterface {
  id: string;
  profileName: string;
  avatar: string;
  about: string;
  threadCounts?: number;
  commentCounts?: number;
  likeCounts?: number;
  projects: ProjectInterface[];
}
