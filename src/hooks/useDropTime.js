import { useCallback, useState } from "react";

export default function useDropTime(level) {
  const [dropTime, setDropTime] = useState(null);
  const [lockDelayCount, setLockDelayCount] = useState(0);

  const startAutoDrop = useCallback(() => {
    const time = ((1100 - 200) / 15) * (15 - level) + 200;
    setDropTime(time);
  }, [level]);

  const setLockDelay = () => {
    setLockDelayCount((prev) => {
      setDropTime(
        lockDelayCount <= 20
          ? Math.max(500, ((1100 - 200) / 15) * (15 - level) + 200) -
              prev / 1000
          : 0
      );
      return prev + 1;
    });
  };

  const stopAutoDrop = useCallback(() => {
    setDropTime(null);
  }, []);

  return {
    dropTime,
    setLockDelayCount,
    startAutoDrop,
    setLockDelay,
    stopAutoDrop,
  };
}
