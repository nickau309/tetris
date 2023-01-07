import { useCallback, useEffect, useState } from "react";
import {
  calculateShadowDistance,
  createRow,
  createStage,
} from "../utilities/gameHelper";

export default function useStage(player, nextPlayer) {
  const [stage, setStage] = useState(() => createStage());
  const [gameOver, setGameOver] = useState(true);
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    const sweepRows = (updatedStage) => {
      // Check if any rows can be sweeped
      let rowsSweeped = 0;
      const newStage = updatedStage.reduce((acc, row) => {
        if (row.every((cell) => cell.status === "merged")) {
          ++rowsSweeped;
          acc.unshift(createRow());
        } else {
          acc.push(row);
        }
        return acc;
      }, []);
      setRowsCleared(rowsSweeped);

      // Check if game is over
      // Generate next tetro if game is yet over
      const isGameOver = newStage
        .slice(0, 2)
        .flat()
        .some((cell) => cell.status === "merged");
      if (isGameOver) {
        setGameOver(true);
      } else {
        nextPlayer();
      }

      return newStage;
    };

    const updateStage = (prevStage) => {
      // Flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => ({
          type: cell.status === "clear" ? "0" : cell.type,
          status: cell.status,
        }))
      );

      // Calculate the shadow distance of current tetromino
      const shadowY = calculateShadowDistance(player, newStage);

      // Draw the tetromino and the shadow
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== "0") {
            const shadowCell =
              newStage[y + player.pos.y + shadowY][x + player.pos.x];
            shadowCell.type = "X";

            const cell = newStage[y + player.pos.y][x + player.pos.x];
            cell.type = value;
            cell.status = player.collided ? "merged" : "clear";
          }
        });
      });

      // Check if we collided
      if (player.collided) {
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, nextPlayer]);

  const resetStage = useCallback(() => {
    setStage(createStage());
    setGameOver(false);
    setRowsCleared(0);
  }, []);

  const resetRowsCleared = useCallback(() => {
    setRowsCleared(0);
  }, []);

  return { stage, gameOver, rowsCleared, resetStage, resetRowsCleared };
}
