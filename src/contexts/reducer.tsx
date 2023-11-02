import {
  checkCollision,
  checkIfGameIsOver,
  createStage,
  getAutoDrop,
  getAutoDropWhenLockDelay,
  getHighScore,
  getNextTypes,
  getPlayer,
  getRandomTetrominoBag,
  getRotatedPlayer,
  getShadowDistance,
  sweepRows,
  updateHighScore,
  updateStage,
  updateStatus,
} from "../utils";
import { initialHoldTetro, initialStatus } from "./init";
import type { PlayerGameState } from "../types";
import type { GameAction, GameState } from "./TetrisContext.types";

export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADD_SCORE": {
      return {
        ...state,
        status: {
          ...state.status,
          score: state.status.score + action.score,
        },
      };
    }
    case "SOFT_DROP": {
      if (!state.isGameOver) {
        const moveY = getShadowDistance(state.player, state.stage);
        if (moveY === 0) {
          // Old player
          const player1: PlayerGameState = {
            ...state.player,
            collided: true,
          };
          const { stage: stage1, rowsSweeped } = sweepRows(
            updateStage(player1, state.stage),
          );
          const isGameOver = checkIfGameIsOver(stage1);
          if (isGameOver) {
            const highScore = updateHighScore(
              state.highScore,
              state.status.score,
            );
            return {
              ...state,
              isGameOver,
              player: player1,
              stage: stage1,
              highScore,
            };
          }

          // New player
          const { player: player2, nextTypes } = getNextTypes(
            state.nextTypes,
            stage1,
          );
          const stage2 = updateStage(player2, stage1);
          const status = updateStatus(state.status, rowsSweeped);
          const autoDrop = getAutoDrop(status.level);
          return {
            ...state,
            player: player2,
            holdTetro: {
              ...state.holdTetro,
              canHold: true,
            },
            nextTypes,
            stage: stage2,
            status,
            autoDrop,
          };
        } else if (moveY === 1) {
          const player = {
            ...state.player,
            y: state.player.y + 1,
          };
          const stage = updateStage(player, state.stage);
          const autoDrop = getAutoDropWhenLockDelay(
            state.status.level,
            state.autoDrop,
          );
          return {
            ...state,
            player,
            stage,
            autoDrop,
          };
        } else {
          const player = {
            ...state.player,
            y: state.player.y + 1,
          };
          const stage = updateStage(player, state.stage);
          return {
            ...state,
            player,
            stage,
            autoDrop: {
              ...state.autoDrop,
              timestamp: Date.now(),
            },
          };
        }
      }
      return state;
    }
    case "HARD_DROP": {
      if (!state.isGameOver) {
        // Old player
        const moveY = getShadowDistance(state.player, state.stage);
        const player1: PlayerGameState = {
          ...state.player,
          y: state.player.y + moveY,
          collided: true,
        };
        const { stage: stage1, rowsSweeped } = sweepRows(
          updateStage(player1, state.stage),
        );
        const status1 = {
          ...state.status,
          score: state.status.score + moveY * 2,
        };
        const isGameOver = checkIfGameIsOver(stage1);
        if (isGameOver) {
          const highScore = updateHighScore(
            state.highScore,
            state.status.score,
          );
          return {
            ...state,
            isGameOver,
            player: player1,
            stage: stage1,
            status: status1,
            highScore,
          };
        }

        // New player
        const { player: player2, nextTypes } = getNextTypes(
          state.nextTypes,
          stage1,
        );
        const stage2 = updateStage(player2, stage1);
        const status2 = updateStatus(status1, rowsSweeped);
        const autoDrop = getAutoDrop(status2.level);
        return {
          ...state,
          player: player2,
          holdTetro: {
            ...state.holdTetro,
            canHold: true,
          },
          nextTypes,
          stage: stage2,
          status: status2,
          autoDrop,
        };
      }
      return state;
    }
    case "MOVE": {
      if (
        !state.isGameOver &&
        !checkCollision(state.player, state.stage, { x: action.dir, y: 0 })
      ) {
        const player = {
          ...state.player,
          x: state.player.x + action.dir,
        };
        const stage = updateStage(player, state.stage);
        return {
          ...state,
          player,
          stage,
        };
      }
      return state;
    }
    case "RESET": {
      const [type, ...nextTypes] = getRandomTetrominoBag();
      const initialStage = createStage();
      const player = getPlayer(initialStage, type);
      const stage = updateStage(player, initialStage);
      const status = initialStatus;
      const autoDrop = getAutoDrop(status.level);
      const highScore = getHighScore(state.highScore);
      return {
        isGameOver: false,
        player,
        holdTetro: initialHoldTetro,
        nextTypes,
        stage,
        status,
        autoDrop,
        highScore,
      };
    }
    case "ROTATE": {
      if (!state.isGameOver && state.player.type !== "O") {
        const player = getRotatedPlayer(state.player, state.stage, action.dir);
        if (player === null) {
          return state;
        }
        const stage = updateStage(player, state.stage);
        const willCollide = getShadowDistance(player, stage) === 0;
        const isTSpin = willCollide && player.type === "T";
        const autoDrop = willCollide
          ? getAutoDropWhenLockDelay(state.status.level, state.autoDrop)
          : state.autoDrop;
        return {
          ...state,
          player,
          stage,
          status: {
            ...state.status,
            isTSpin,
          },
          autoDrop,
        };
      }
      return state;
    }
    case "HOLD": {
      if (!state.isGameOver && state.holdTetro.canHold) {
        if (state.holdTetro.type === "0") {
          const { player, nextTypes } = getNextTypes(
            state.nextTypes,
            state.stage,
          );
          const stage = updateStage(player, state.stage);
          const status = {
            ...state.status,
            isTSpin: false,
          };
          const autoDrop = getAutoDrop(status.level);
          return {
            ...state,
            player,
            holdTetro: { type: state.player.type, canHold: false },
            nextTypes,
            stage,
            status,
            autoDrop,
          };
        } else {
          const player = getPlayer(state.stage, state.holdTetro.type);
          const stage = updateStage(player, state.stage);
          const status = {
            ...state.status,
            isTSpin: false,
          };
          const autoDrop = getAutoDrop(status.level);
          return {
            ...state,
            player,
            holdTetro: { type: state.player.type, canHold: false },
            stage,
            status,
            autoDrop,
          };
        }
      }
      return state;
    }
  }
}
