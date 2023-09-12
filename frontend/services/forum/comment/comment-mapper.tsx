import { IComment } from "@interfaces/forum/post/post";

export default function commentMapper(data: any): IComment {
  return {
    id: data.id,
    threadId: data.post_thread,
    parentId: data.parent,
    author: data.author,
    content: data.content,
    date: data.updated_at,
    depth: data.depth,
    images: data.images,
    likes: data.likes,
    isLiked: data.is_liked,
    isActive: data.is_active,
    isEdited: data.is_edited,
  };
}
