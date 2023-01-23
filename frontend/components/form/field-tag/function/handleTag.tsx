import { SetStateAction, Dispatch, useCallback } from "react";
import {
  ThreadBodyInterface,
  TagInterface,
} from "../../../../interfaces/forum/post/post";

export function useAddTag(
  tags: Set<TagInterface>,
  setThread: Dispatch<SetStateAction<ThreadBodyInterface>>
) {
  return useCallback(
    (tag: TagInterface) => {
      let newTags = tags;
      newTags.add(tag);
      setThread((thread) => ({ ...thread, tags: newTags }));
    },
    [tags, setThread]
  );
}

export function useRemoveTag(
  tags: Set<TagInterface>,
  setThread: Dispatch<SetStateAction<ThreadBodyInterface>>
) {
  return useCallback(
    (tag: TagInterface) => {
      let newTags = tags;
      newTags.delete(tag);
      setThread((thread) => ({ ...thread, tags: newTags }));
    },
    [tags, setThread]
  );
}
