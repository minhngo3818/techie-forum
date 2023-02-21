type PostId = { id: string };
type ThreadId = { thid: string };
type ParentCommentId = { pcid?: string };
type Author = { author: string };
type AuthorId = { authorId: string };
type Avatar = { avatar: string };
type Title = { title: string };
type PostDate = { date: Date };
type Content = { content: string };
type Depth = { depth?: number };
type Memorized = { memorized?: boolean };
type Images = { images?: string[] };
type Likes = { likes?: number };

export interface TagInterface {
  name: string;
  date?: Date;
}

export interface CommentInterface
  extends PostId,
    ThreadId,
    ParentCommentId,
    Author,
    AuthorId,
    Avatar,
    PostDate,
    Content,
    Depth,
    Images,
    Likes {
  comments?: CommentInterface[];
}

export interface ThreadBodyInterface extends Title, Content, Images {
  tags: Set<TagInterface>;
}

export interface ThreadInterface
  extends PostId,
    Author,
    AuthorId,
    Avatar,
    PostDate,
    Likes,
    Memorized,
    ThreadBodyInterface {
  comments?: CommentInterface[];
}

export default interface PostHeaderInterface {
  author: string;
  authorId: string;
  avatar: string;
  date: Date;
}
