import { SetStateAction, Dispatch, useCallback } from "react";
import ThreadInterface from "../../../../interfaces/thread";

export function useAddTag(
  tags: Set<string>,
  setThread: Dispatch<SetStateAction<ThreadInterface>>
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
  setThread: Dispatch<SetStateAction<ThreadInterface>>
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
