type PostId = { id: string };
type ThreadId = { threadId: string };
type ParentId = { parentId?: string };
type Category = { category: string };
type Title = { title: string };
type PostDate = { date: Date };
type Content = { content: string };
type Depth = { depth: number };
type Tags = { tags?: string[] };
type Marked = { isMarked: boolean };
type Images = { images?: string[] | FileList };
type Likes = { likes: number };
type IsLiked = { isLiked: boolean };
type IsActive = { isActive: boolean };
type IsEdited = { isEdited: boolean };
type ReplyCount = { replyCount: number };

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
    ParentId,
    IAuthor,
    PostDate,
    Content,
    Depth,
    Images,
    Likes,
    IsLiked,
    IsActive,
    IsEdited,
    ReplyCount {
  comments?: IComment[];
}

export interface ICommentPost
  extends ThreadId,
    ParentId,
    Content,
    Depth,
    Images {}

export interface IThreadBody extends Category, Title, Content, Images, Tags {}

export interface IThread
  extends PostId,
    IAuthor,
    PostDate,
    Likes,
    IsLiked,
    Marked,
    IsEdited,
    IsActive,
    IThreadBody {
  commentCount: number;
}

export default interface IPostHeader extends IAuthor, IsEdited {
  date: Date;
}
