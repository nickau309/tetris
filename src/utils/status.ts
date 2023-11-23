import type { Status } from "../types";

export function updateStatus(
  isTSpin: boolean,
  status: Status,
  rowsCleared: number,
): Status {
  if (rowsCleared === 0) {
    return status;
  }

  const linePoints = [100, 300, 500, 800];
  const tSpinLinePoints = [800, 1200, 1600];

  // Base score depends on rowsCleared, level, and isTSpin
  let points = isTSpin
    ? status.level * tSpinLinePoints[rowsCleared - 1]
    : status.level * linePoints[rowsCleared - 1];

  // If it is a consecutive back to back (tetris or t-spin rows cleared,
  // both previous rows cleared and current rows cleared),
  // multiply the score by 1.5
  const isB2b = rowsCleared === 4 || isTSpin;
  if (status.isB2b && isB2b) {
    points *= 1.5;
  }

  // Update Rows
  const rows = status.rows + rowsCleared;

  // Level Up if necessary
  const level =
    rows > status.level * 5 && status.level < 15
      ? status.level + 1
      : status.level;

  // Update Score
  const score = status.score + points;

  return { score, level, rows, isB2b };
}
