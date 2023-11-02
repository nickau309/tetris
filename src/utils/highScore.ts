import type { HighScoreGameState, HighScoreState } from "../types";

export function getHighScore(highScore: HighScoreState): HighScoreGameState {
  return highScore ?? new Array<number>(5).fill(0);
}

export function updateHighScore(
  highScore: HighScoreGameState,
  score: number,
): HighScoreGameState {
  const index = highScore.findIndex((hs) => hs < score);
  if (index !== -1) {
    return highScore.toSpliced(index, 0, score).slice(0, -1);
  }
  return highScore;
}
