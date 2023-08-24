import { SetStateAction, Dispatch, useCallback } from "react";
import { IThreadBody } from "../../../../interfaces/forum/post/post";

export function useAddTag(
  tags: string[] | undefined,
  setThread: Dispatch<SetStateAction<IThreadBody>>
) {
  return useCallback(
    (tag: string) => {
      let newTags = new Set(tags);
      newTags.add(tag);
      setThread((thread) => ({ ...thread, tags: Array.from(newTags) }));
    },
    [tags, setThread]
  );
}

export function useRemoveTag(
  tags: string[] | undefined,
  setThread: Dispatch<SetStateAction<IThreadBody>>
) {
  return useCallback(
    (tag: string) => {
      let newTags = tags;
      newTags?.splice(newTags.indexOf(tag), 1);
      setThread((thread) => ({ ...thread, tags: newTags }));
    },
    [tags, setThread]
  );
}
