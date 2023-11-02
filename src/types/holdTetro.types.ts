import type { GameType, InitType } from "./index.types";

export type HoldTetroInitState = { type: InitType; canHold: true };

type HoldTetroGameState = { type: GameType; canHold: boolean };

export type HoldTetroState = HoldTetroInitState | HoldTetroGameState;
