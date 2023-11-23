import type { HighScoreGameState, HighScoreState } from "../types";

export function updateHighScore(
  highScore: HighScoreState,
  score: number,
): HighScoreGameState {
  if (highScore === null) {
    return [score, 0, 0, 0, 0];
  }
  const index = highScore.findIndex((hs) => hs < score);
  if (index !== -1) {
    return highScore.toSpliced(index, 0, score).slice(0, -1);
  }
  return highScore;
}
