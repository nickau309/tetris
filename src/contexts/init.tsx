import { createStage } from "../utils";
import type {
  Status,
  HighScoreState,
  PlayerInitState,
  HoldTetroInitState,
  NextTypesInitState,
  AutoDropInitState,
} from "../types";
import type { GameInitState } from "./TetrisContext.types";

const initialPlayer: PlayerInitState = {
  type: "0",
  rotation: 0,
  x: null,
  y: null,
  collided: false,
};

export const initialHoldTetro: HoldTetroInitState = {
  type: "0",
  canHold: true,
};
const initialNextTypes: NextTypesInitState = ["0", "0", "0", "0", "0"];

export const initialStatus: Status = {
  score: 0,
  level: 1,
  rows: 0,
  isTSpin: false,
  isB2b: false,
};

const initialAutoDrop: AutoDropInitState = {
  timestamp: null,
  dropTime: null,
  lockDelayCount: 0,
};

export function createInitialState(): GameInitState {
  const savedHighScore = localStorage.getItem("highScore");
  const highScore =
    savedHighScore === null
      ? null
      : (JSON.parse(savedHighScore) as HighScoreState);
  const stage = createStage();

  return {
    isGameOver: true,
    player: initialPlayer,
    holdTetro: initialHoldTetro,
    nextTypes: initialNextTypes,
    stage,
    status: initialStatus,
    autoDrop: initialAutoDrop,
    highScore,
  };
}
