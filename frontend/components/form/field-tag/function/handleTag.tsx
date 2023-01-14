import { SetStateAction, Dispatch, useCallback } from "react";
import ThreadBodyInterface from "../../../../interfaces/forum/thread/thread-body";

export function useAddTag(
  tags: Set<string>,
  setThread: Dispatch<SetStateAction<ThreadBodyInterface>>
) {
  return useCallback(
    (tag: string) => {
      let newTags = tags;
      newTags.add(tag);
      setThread((thread) => ({ ...thread, tags: newTags }));
    },
    [tags, setThread]
  );
}

export function useRemoveTag(
  tags: Set<string>,
  setThread: Dispatch<SetStateAction<ThreadBodyInterface>>
) {
  return useCallback(
    (tag: string) => {
      let newTags = tags;
      newTags.delete(tag);
      setThread((thread) => ({ ...thread, tags: newTags }));
    },
    [tags, setThread]
  );
}
