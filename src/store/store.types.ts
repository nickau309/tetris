import type { StateCreator } from "zustand";
import type {
  AutoDropState,
  HighScoreState,
  HoldTetroState,
  NextTypesState,
  PlayerState,
  Stage,
  Status,
} from "../types";

export type State = {
  isGameOver: boolean;
  player: PlayerState;
  isTSpin: boolean;
  collided: boolean;
  holdTetro: HoldTetroState;
  nextTypes: NextTypesState;
  stage: Stage;
  status: Status;
  autoDrop: AutoDropState;
  highScore: HighScoreState;
};

export type Action = {
  gravityDrop: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  move: (dir: 1 | -1) => void;
  rotate: (dir: 1 | -1) => void;
  hold: () => void;
  reset: () => void;
};

export type CreateSlice<T extends State | Action> = StateCreator<
  State & Action,
  [["zustand/subscribeWithSelector", never], ["zustand/persist", unknown]],
  [],
  T
>;

export type Store = StateCreator<
  State & Action,
  [["zustand/subscribeWithSelector", never], ["zustand/persist", unknown]]
>;
