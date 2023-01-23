import { useState, useEffect } from "react";

export default function useAutosizeTextArea(
  textAreaRef: HTMLTextAreaElement | null,
  value: string | undefined
) {
  const [initialHeight, setInitialHeight] = useState(0);

  useEffect(() => {
    if (textAreaRef) {
      const clientHeight = textAreaRef.clientHeight;
      if (initialHeight === 0) {
        setInitialHeight(clientHeight);
      }

      const scrollHeight = textAreaRef.scrollHeight;

      if (scrollHeight > clientHeight) {
        textAreaRef.style.height = scrollHeight + "px";
      }

      if (textAreaRef.value === "" && initialHeight !== 0) {
        textAreaRef.style.height = initialHeight + "px";
      }
    }
  }, [textAreaRef, value]);
}
