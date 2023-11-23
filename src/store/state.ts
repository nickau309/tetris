import { createStage } from "../utils";
import type { HoldTetroInitState, Status } from "../types";
import type { CreateSlice, State } from "./store.types";

export const initialHoldTetro: HoldTetroInitState = {
  type: "0",
  canHold: true,
};

export const initialStatus: Status = {
  score: 0,
  level: 1,
  rows: 0,
  isB2b: false,
};

export const createStateSlice: CreateSlice<State> = () => ({
  isGameOver: true,
  player: null,
  isTSpin: false,
  collided: false,
  holdTetro: initialHoldTetro,
  nextTypes: ["0", "0", "0", "0", "0"],
  stage: createStage(),
  status: initialStatus,
  autoDrop: null,
  highScore: null,
});
