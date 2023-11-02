import type { HighScoreState } from "../../types";

export type PanelProps = {
  highScore: HighScoreState;
  startGame: () => void;
};
