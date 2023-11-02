import type { AutoDropGameState } from "../types";

function getDropTime(level: number): number {
  return ((1100 - 200) / 15) * (15 - level) + 200;
}

export function getAutoDrop(level: number): AutoDropGameState {
  const timestamp = Date.now();
  const dropTime = getDropTime(level);
  const lockDelayCount = 0;
  return { timestamp, dropTime, lockDelayCount };
}

export function getAutoDropWhenLockDelay(
  level: number,
  autoDrop: AutoDropGameState,
): AutoDropGameState {
  const timestamp = Date.now();
  const lockDelayCount = autoDrop.lockDelayCount + 1;
  const dropTime = lockDelayCount <= 20 ? Math.max(500, getDropTime(level)) : 0;
  return { timestamp, dropTime, lockDelayCount };
}
