import { SetStateAction, Dispatch, useCallback } from "react";
import { IThreadBody } from "../../../../interfaces/forum/post/post";

export function useAddTag(
  tags: Set<string>,
  setThread: Dispatch<SetStateAction<IThreadBody>>
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
  setThread: Dispatch<SetStateAction<IThreadBody>>
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
