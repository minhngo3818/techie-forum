type PostId = { id: string };
type ThreadId = { threadId: string };
type ParentId = { parentId?: string };
type Category = { category: string };
type Title = { title: string };
type PostDate = { date: Date };
type Content = { content: string };
type Depth = { depth?: number };
type Tags = { tags?: string[] };
type Marked = { isMarked: boolean };
type Images = { images?: string[] | FileList };
type Likes = { likes: number };
type Liked = { isLiked: boolean };
type IsActive = { isActive: boolean };
type IsEdited = { isEdited: boolean };

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
    IsActive,
    IsEdited {
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
    Liked,
    Marked,
    IsEdited,
    IsActive,
    IThreadBody {
  commentCount: number;
}

export default interface IPostHeader extends IAuthor, IsEdited {
  date: Date;
}
