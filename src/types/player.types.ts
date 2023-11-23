import type { GameType } from "./index.types";

type PlayerInitState = null;

export type PlayerGameState = {
  type: GameType;
  rotation: number;
  x: number;
  y: number;
};

export type PlayerState = PlayerInitState | PlayerGameState;
