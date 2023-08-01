import ProjectInterface from "../project/project";
import RefLinksInterface from "./ref-links";

type ProfileId = { id: string };
type ProfileName = { profile_name?: string };
type Avatar = { avatar?: string | Blob };
type About = { about?: string };
type ThreadCounts = { threadCounts: number };
type CommentCounts = { commentCounts: number };
type LikeCounts = { likeCounts: number };
type ProjectList = { projects?: ProjectInterface[] };

/**
 * Used for creating and updating profile information
 */
export interface IProfileForm
  extends ProfileName,
    Avatar,
    About,
    RefLinksInterface,
    ProjectList {}

/**
 * Used for displaying profile information
 */
export interface IProfile
  extends ProfileId,
    IProfileForm,
    ThreadCounts,
    CommentCounts,
    LikeCounts {}
