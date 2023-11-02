import { useEffect, useRef } from "react";

export default function useInterval(fn: () => void, delay: number | null) {
  const callback = useRef(fn);

  // Remember the latest callback
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // Set up the interval
  useEffect(() => {
    if (delay !== null && delay >= 0) {
      const id = setInterval(() => {
        callback.current();
      }, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
