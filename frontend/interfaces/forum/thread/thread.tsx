import ThreadBodyInterface from "./thread-body";
import CommentInterface from "../comment/comment";

export default interface ThreadInterface extends ThreadBodyInterface {
  tid: string;
  author: string;
  authorId: string;
  avatar: string;
  date: Date;
  memorize?: boolean;
  comments?: CommentInterface[];
  numOfLikes?: number;
}
