export default interface CommentUserInterface {
  author: string;
  authorId: string;
  avatar: string;
  images?: string[];
  content: string;
  date: Date;
  numOfLikes?: number;
}
