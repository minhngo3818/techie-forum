import { IThread } from "@interfaces/forum/post/post";

export default function threadMapper(data: any): IThread {
  return {
    id: data.id,
    author: data.author,
    category: data.category,
    date: data.updated_at,
    title: data.title,
    content: data.content,
    images: data.images,
    tags: data.tags,
    isMarked: data.is_marked,
    likes: data.likes,
    isLiked: data.is_liked,
    isEdited: data.is_edited,
    isActive: data.is_active,
    commentCount: data.comment_count,
  };
}
