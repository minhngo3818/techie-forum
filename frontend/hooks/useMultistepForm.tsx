import { useState } from "react";

export default function useMultistepForm(steps: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    setCurrentIndex((index) => {
      if (index > steps.length - 1) return steps.length - 1;
      return index + 1;
    });
  }

  function prev() {
    setCurrentIndex((index) => {
      if (index < 0) return 0;
      return index - 1;
    });
  }

  function goTo(newIndex: number) {
    setCurrentIndex(newIndex);
  }

  return {
    currentIndex,
    next,
    prev,
    goTo,
  };
}
