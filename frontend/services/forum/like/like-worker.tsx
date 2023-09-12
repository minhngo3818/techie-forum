import { likePost, unlikePost } from "./like-service";

export async function setLikeWorker(
  postId: string,
  isLiked: boolean,
  setIsLike: (value: React.SetStateAction<boolean>) => void,
  setLike: (value: React.SetStateAction<number>) => void
) {
  try {
    if (!isLiked) {
      await likePost(postId);
      setLike((like) => like + 1);
    } else {
      await unlikePost(postId);
      setLike((like) => (like === 0 ? 0 : like - 1));
    }
    setIsLike((isLiked) => !isLiked);
  } catch (error) {
    console.log(error);
  }
}
