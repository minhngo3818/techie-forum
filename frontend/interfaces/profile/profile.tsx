import ProjectInterface from "../project/project";
import RefLinksInterface from "./ref-links";

type ProfileId = { id: string };
type ProfileName = { profile_name?: string };
type Avatar = { avatar?: string };
type About = { about?: string };
type ThreadCounts = { threadCounts: number };
type CommentCounts = { commentCounts: number };
type LikeCounts = { likeCounts: number };
type ProjectList = { projects?: ProjectInterface[] };

export interface ProfileCreationInterface
  extends ProfileName,
    Avatar,
    About,
    RefLinksInterface,
    ProjectList {}

export interface ProfileInterface
  extends ProfileId,
    ProfileCreationInterface,
    ThreadCounts,
    CommentCounts,
    LikeCounts {}
