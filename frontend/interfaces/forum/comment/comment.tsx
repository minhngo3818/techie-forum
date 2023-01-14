export default interface CommentInterface {
  cid: string,
  author: string;
  authorId: string;
  avatar: string;
  images?: string[];
  content: string;
  date: Date;
  numOfLikes?: number;
}
