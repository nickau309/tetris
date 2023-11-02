import type { GameType, InitType } from "./index.types";

export type PlayerInitState = {
  type: InitType;
  rotation: 0;
  x: null;
  y: null;
  collided: false;
};

export type PlayerGameState = {
  type: GameType;
  rotation: number;
  x: number;
  y: number;
  collided: boolean;
};
