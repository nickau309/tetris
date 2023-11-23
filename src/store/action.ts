import {
  checkCollision,
  createStage,
  getAutoDrop,
  getPlayer,
  getRandomTetrominoBag,
  getRotatedPlayer,
  getShadowDistance,
  updateAutoDrop,
  updateAutoDropWithLockDelay,
} from "../utils";
import { initialHoldTetro, initialStatus } from "./state";
import type { Action, CreateSlice } from "./store.types";

export const createActionSlice: CreateSlice<Action> = (set, get) => ({
  gravityDrop: () => {
    const { isGameOver, player, stage, status, autoDrop } = get();
    if (!isGameOver && player !== null && autoDrop !== null) {
      const moveY = getShadowDistance(player, stage);
      if (moveY > 1) {
        const newAutoDrop = updateAutoDrop(autoDrop);
        set({
          player: {
            ...player,
            y: player.y + 1,
          },
          isTSpin: false,
          autoDrop: newAutoDrop,
        });
      } else if (moveY === 1) {
        const newAutoDrop = updateAutoDropWithLockDelay(autoDrop, status.level);
        set({
          player: {
            ...player,
            y: player.y + 1,
          },
          isTSpin: false,
          autoDrop: newAutoDrop,
        });
      } else {
        set({ collided: true });
      }
    }
  },
  softDrop: () => {
    const { isGameOver, player, stage, status, autoDrop } = get();
    if (!isGameOver && player !== null && autoDrop !== null) {
      const moveY = getShadowDistance(player, stage);
      if (moveY > 1) {
        const newAutoDrop = updateAutoDrop(autoDrop);
        set({
          player: {
            ...player,
            y: player.y + 1,
          },
          isTSpin: false,
          status: {
            ...status,
            score: status.score + 1,
          },
          autoDrop: newAutoDrop,
        });
      } else if (moveY === 1) {
        const newAutoDrop = updateAutoDropWithLockDelay(autoDrop, status.level);
        set({
          player: {
            ...player,
            y: player.y + 1,
          },
          isTSpin: false,
          status: {
            ...status,
            score: status.score + 1,
          },
          autoDrop: newAutoDrop,
        });
      } else {
        set({ collided: true });
      }
    }
  },
  hardDrop: () => {
    const { isGameOver, player, stage, status } = get();
    if (!isGameOver && player !== null) {
      const moveY = getShadowDistance(player, stage);
      set({
        player: {
          ...player,
          y: player.y + moveY,
        },
        collided: true,
        status: {
          ...status,
          score: status.score + moveY * 2,
        },
      });
    }
  },
  move: (dir) => {
    const { isGameOver, player, stage } = get();
    if (
      !isGameOver &&
      player !== null &&
      !checkCollision(player, stage, { x: dir, y: 0 })
    ) {
      set({
        player: {
          ...player,
          x: player.x + dir,
        },
      });
    }
  },
  rotate: (dir) => {
    const { isGameOver, player, stage, status, autoDrop } = get();
    if (!isGameOver && player !== null && autoDrop !== null) {
      const newPlayer = getRotatedPlayer(player, stage, dir);
      if (newPlayer !== null) {
        const willCollide = getShadowDistance(player, stage) === 0;
        if (willCollide) {
          const isTSpin = player.type === "T";
          const newAutoDrop = updateAutoDropWithLockDelay(
            autoDrop,
            status.level,
          );
          set({
            player: newPlayer,
            isTSpin,
            autoDrop: newAutoDrop,
          });
        } else {
          set({
            player: newPlayer,
            isTSpin: false,
          });
        }
      }
    }
  },
  hold: () => {
    const { isGameOver, player, holdTetro, stage, status } = get();
    if (!isGameOver && player !== null && holdTetro.canHold) {
      const newPlayer = getPlayer(stage, holdTetro.type);
      const autoDrop = getAutoDrop(status.level);
      set({
        player: newPlayer,
        isTSpin: false,
        holdTetro: { type: player.type, canHold: false },
        autoDrop,
      });
    }
  },
  reset: () => {
    const [type, ...nextTypes] = getRandomTetrominoBag();
    const stage = createStage();
    const player = getPlayer(stage, type);
    const status = initialStatus;
    const autoDrop = getAutoDrop(status.level);
    set({
      isGameOver: false,
      player,
      isTSpin: false,
      collided: false,
      holdTetro: initialHoldTetro,
      nextTypes,
      stage,
      status,
      autoDrop,
    });
  },
});
