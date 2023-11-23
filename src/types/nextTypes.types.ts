import type { GameType, InitType } from "./index.types";

type NextTypesInitState = InitType[];

export type NextTypesGameState = GameType[];

export type NextTypesState = NextTypesInitState | NextTypesGameState;
