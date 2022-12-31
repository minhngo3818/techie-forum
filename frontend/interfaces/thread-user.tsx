import ThreadInterface from "./thread";
import CommentUserInterface from "./comment-user";

export default interface ThreadUserInterface extends ThreadInterface {
  author: string;
  authorId: string;
  avatar: string;
  date: Date;
  memorize?: boolean;
  comments?: CommentUserInterface[];
  numOfLikes?: number;
}
