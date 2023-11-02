/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useInterval } from "../hooks";
import { createInitialState } from "./init";
import { reducer } from "./reducer";
import type {
  GameAction,
  GameProviderProps,
  GameState,
} from "./TetrisContext.types";

const GameContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<React.Dispatch<GameAction> | null>(
  null,
);

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(reducer, null, createInitialState);

  useEffect(() => {
    if (state.highScore) {
      localStorage.setItem("highScore", JSON.stringify(state.highScore));
    }
  }, [state.highScore]);

  const checkTetro = useCallback(() => {
    if (
      state.autoDrop.timestamp !== null &&
      state.autoDrop.timestamp + state.autoDrop.dropTime < Date.now()
    ) {
      dispatch({ type: "SOFT_DROP" });
    }
  }, [state.autoDrop.dropTime, state.autoDrop.timestamp]);

  useInterval(checkTetro, state.isGameOver ? null : 20);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  const gameContext = useContext(GameContext);

  if (gameContext === null) {
    throw new Error("useGame has to be used within <GameProvider />");
  }

  return gameContext;
}

export function useGameDispatch() {
  const gameDispatchContext = useContext(GameDispatchContext);

  if (gameDispatchContext === null) {
    throw new Error("useGameDispatch has to be used within <GameProvider />");
  }

  return gameDispatchContext;
}
