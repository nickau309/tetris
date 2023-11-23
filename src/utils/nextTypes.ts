import type { NextTypesGameState, NextTypesState } from "../types";

export function isNextTypesGameState(
  nextTypes: NextTypesState,
): nextTypes is NextTypesGameState {
  for (const nextType of nextTypes) {
    if (nextType === "0") {
      return false;
    }
  }
  return true;
}
