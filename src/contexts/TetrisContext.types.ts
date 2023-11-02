import type { ReactNode } from "react";
import type {
  AutoDropGameState,
  AutoDropInitState,
  HighScoreGameState,
  HighScoreState,
  HoldTetroInitState,
  HoldTetroState,
  NextTypesGameState,
  NextTypesInitState,
  PlayerGameState,
  PlayerInitState,
  Stage,
  Status,
} from "../types";

export type GameProviderProps = {
  children: ReactNode;
};

export type GameInitState = {
  isGameOver: true;
  player: PlayerInitState;
  holdTetro: HoldTetroInitState;
  nextTypes: NextTypesInitState;
  stage: Stage;
  status: Status;
  autoDrop: AutoDropInitState;
  highScore: HighScoreState;
};

export type GamePlayState = {
  isGameOver: false;
  player: PlayerGameState;
  holdTetro: HoldTetroState;
  nextTypes: NextTypesGameState;
  stage: Stage;
  status: Status;
  autoDrop: AutoDropGameState;
  highScore: HighScoreGameState;
};

type GameOverState = {
  isGameOver: true;
  player: PlayerGameState;
  holdTetro: HoldTetroState;
  nextTypes: NextTypesGameState;
  stage: Stage;
  status: Status;
  autoDrop: AutoDropGameState;
  highScore: HighScoreGameState;
};

export type GameState = GameInitState | GamePlayState | GameOverState;

export type GameAction =
  | { type: "ADD_SCORE"; score: number }
  | { type: "SOFT_DROP" }
  | { type: "HARD_DROP" }
  | {
      type: "MOVE";
      dir: -1 | 1;
    }
  | { type: "RESET" }
  | {
      type: "ROTATE";
      dir: -1 | 1;
    }
  | { type: "HOLD" };
