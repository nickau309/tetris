import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import {
  checkIfGameIsOver,
  getAutoDrop,
  getPlayer,
  getRandomTetrominoBag,
  isNextTypesGameState,
  mergeStage,
  sweepRows,
  updateHighScore,
  updateStage,
  updateStatus,
} from "../utils";
import { createStateSlice } from "./state";
import { createActionSlice } from "./action";
import type { Store } from "./store.types";

const store: Store = (...props) => ({
  ...createStateSlice(...props),
  ...createActionSlice(...props),
});

export const useStore = create(
  subscribeWithSelector(
    persist(store, {
      name: "data",
      partialize: (state) => ({ highScore: state.highScore }),
    }),
  ),
);

export default useStore;

useStore.subscribe((state) => state, console.log);

useStore.subscribe(
  (state) => state.isGameOver,
  (isGameOver) => {
    if (isGameOver) {
      const { status, highScore } = useStore.getState();
      const newHighScore = updateHighScore(highScore, status.score);
      useStore.setState({ highScore: newHighScore });
    }
  },
);

useStore.subscribe(
  (state) => state.player,
  (player) => {
    if (player === null) {
      const { isGameOver, nextTypes, stage, status } = useStore.getState();
      if (!isGameOver && isNextTypesGameState(nextTypes)) {
        const [newType, ...newNextTypes] = nextTypes;
        const player = getPlayer(stage, newType);
        const autoDrop = getAutoDrop(status.level);
        useStore.setState({
          player,
          collided: false,
          nextTypes: newNextTypes,
          autoDrop,
        });
      }
    }
  },
);

useStore.subscribe(
  (state) => state.nextTypes,
  (nextTypes) => {
    if (isNextTypesGameState(nextTypes) && nextTypes.length < 5) {
      const tetrominoBag = getRandomTetrominoBag();
      useStore.setState({ nextTypes: nextTypes.concat(tetrominoBag) });
    }
  },
);

useStore.subscribe(
  (state) => state.player,
  (player) => {
    if (player !== null) {
      const { isGameOver, stage } = useStore.getState();
      if (!isGameOver) {
        const newStage = updateStage(player, stage);
        useStore.setState({ stage: newStage });
      }
    }
  },
);

useStore.subscribe(
  (state) => state.collided,
  (collided) => {
    if (collided) {
      const { isTSpin, holdTetro, stage, status } = useStore.getState();
      const { stage: newStage, rowsSweeped } = sweepRows(mergeStage(stage));
      const newStatus = updateStatus(isTSpin, status, rowsSweeped);
      const isGameOver = checkIfGameIsOver(newStage);
      useStore.setState({
        isGameOver,
        player: null,
        isTSpin: false,
        holdTetro: {
          ...holdTetro,
          canHold: true,
        },
        stage: newStage,
        status: newStatus,
      });
    }
  },
);
