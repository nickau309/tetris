import { useCallback, useEffect, useRef, useState } from "react";

export default function useGameStatus(rowsCleared, resetRowsCleared) {
  const [score, setScore] = useState(0);
  const level = useRef(1);
  const rows = useRef(0);
  const isTSpin = useRef(false);
  const isB2b = useRef(false);

  useEffect(() => {
    // Add score if rows are cleared
    if (rowsCleared > 0) {
      const linePoints = [100, 300, 500, 800];
      const tSpinLinePoints = [800, 1200, 1600];

      // Base score depends on rowsCleared, level, and isTSpin
      let points =
        level.current *
        (isTSpin.current
          ? tSpinLinePoints[rowsCleared - 1]
          : linePoints[rowsCleared - 1]);

      // If it is a back to back (tetris or t-spin rows cleared,
      // both previous rows cleared and current rows cleared),
      // multiply the score by 1.5;
      const isTetris = rowsCleared === 4;
      if (isB2b.current && (isTetris || isTSpin.current)) {
        points *= 1.5;
      }

      // Set back to back for next rows cleared
      isB2b.current = isTetris || isTSpin.current;

      // Set Rows
      rows.current += rowsCleared;

      // Level Up if necessary
      if (rows.current > level.current * 5 && level.current < 15) {
        ++level.current;
      }

      // Add Score
      setScore((prev) => prev + points);

      // Reset rows cleared
      resetRowsCleared();
    }
  }, [rowsCleared, resetRowsCleared]);

  const addScore = useCallback((points) => {
    setScore((prev) => prev + points);
  }, []);

  const setIsTSpin = useCallback((boolean) => {
    isTSpin.current = boolean;
  }, []);

  const resetGameStatus = useCallback(() => {
    setScore(0);
    level.current = 1;
    rows.current = 0;
    isTSpin.current = false;
    isB2b.current = false;
  }, []);

  return {
    score,
    level: level.current,
    rows: rows.current,
    addScore,
    setIsTSpin,
    resetGameStatus,
  };
}
