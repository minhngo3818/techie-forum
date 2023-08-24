type PostId = { id: string };
type ThreadId = { thid: string };
type ParentCommentId = { pcid?: string };
type Category = { category: string };
type Title = { title: string };
type PostDate = { date: Date };
type Content = { content: string };
type Depth = { depth?: number };
type Tags = { tags?: string[] };
type Memorized = { memorized?: boolean };
type Images = { images?: string[] | FileList };
type Likes = { likes?: number };

export interface IAuthor {
  author: {
    id: string;
    profile_name: string;
    avatar: string;
  };
}

export interface IComment
  extends PostId,
    ThreadId,
    ParentCommentId,
    IAuthor,
    PostDate,
    Content,
    Depth,
    Images,
    Likes {
  comments?: IComment[];
}

export interface IThreadBody extends Category, Title, Content, Images, Tags {}

export interface IThread
  extends PostId,
    IAuthor,
    PostDate,
    Likes,
    Memorized,
    IThreadBody {
  comments?: IComment[];
}

export default interface IPostHeader extends IAuthor {
  date: Date;
}
