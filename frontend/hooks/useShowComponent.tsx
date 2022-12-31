import { useState, useEffect, useRef } from "react";

// Handle click outside the current component
// will hide it
export default function useShowComponent(initialState: boolean) {
  const [isShow, setIsShow] = useState(initialState);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current !== null &&
      !ref.current.contains(event.target as HTMLElement)
    ) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isShow, setIsShow };
}
