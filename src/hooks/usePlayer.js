import { useCallback, useReducer } from "react";
import { STAGE_WIDTH } from "../utilities/gameHelper";
import { TETROMINOS, randomTetrominoBag } from "../utilities/tetrominos";

const initialPlayer = {
  type: "0",
  rotation: 0,
  tetromino: TETROMINOS["0"].shape[0],
  nextType: ["0", "0", "0", "0", "0"],
  tetrominoBag: [],
  holdTetro: { type: "0", justHold: false },
  pos: null,
  collided: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "COLLIDED": {
      return {
        ...state,
        collided: true,
      };
    }
    case "DROP": {
      return {
        ...state,
        pos: {
          x: state.pos.x,
          y: state.pos.y + action.payload.moveY,
        },
      };
    }
    case "MOVE": {
      return {
        ...state,
        pos: {
          x: state.pos.x + action.payload.moveX,
          y: state.pos.y,
        },
      };
    }
    case "NEXT": {
      const type = state.nextType[0];
      const tetromino = TETROMINOS[type].shape[0];
      const nextType = state.nextType.slice(1);
      nextType.push(state.tetrominoBag[0]);
      let tetrominoBag = state.tetrominoBag.slice(1);
      if (!tetrominoBag.length) {
        tetrominoBag = randomTetrominoBag();
      }
      return {
        ...state,
        type,
        rotation: 0,
        tetromino,
        nextType,
        tetrominoBag,
        holdTetro: { type: state.holdTetro.type, justHold: false },
        pos: { x: Math.floor((STAGE_WIDTH - tetromino[0].length) / 2), y: 0 },
        collided: false,
      };
    }
    case "RESET": {
      const tetrominoBag = randomTetrominoBag();
      const nextType = tetrominoBag.splice(0, 5);
      return {
        ...state,
        nextType,
        tetrominoBag,
        holdTetro: { type: "0", justHold: false },
      };
    }
    case "ROTATE": {
      const { dir, move } = action.payload;
      const rotation = (state.rotation + dir + 4) % 4;
      return {
        ...state,
        rotation,
        tetromino: TETROMINOS[state.type].shape[rotation],
        pos: {
          x: state.pos.x + move.x,
          y: state.pos.y + move.y,
        },
      };
    }
    case "HOLD": {
      if (state.holdTetro.type === "0") {
        const type = state.nextType[0];
        const tetromino = TETROMINOS[type].shape[0];
        const nextType = state.nextType.slice(1);
        nextType.push(state.tetrominoBag[0]);
        let tetrominoBag = state.tetrominoBag.slice(1);
        if (!tetrominoBag.length) {
          tetrominoBag = randomTetrominoBag();
        }
        return {
          ...state,
          type,
          rotation: 0,
          tetromino,
          nextType,
          tetrominoBag,
          holdTetro: { type: state.type, justHold: true },
          pos: { x: Math.floor((STAGE_WIDTH - tetromino[0].length) / 2), y: 0 },
          collided: false,
        };
      } else {
        const type = state.holdTetro.type;
        const tetromino = TETROMINOS[type].shape[0];
        return {
          ...state,
          type,
          rotation: 0,
          tetromino,
          holdTetro: { type: state.type, justHold: true },
          pos: { x: Math.floor((STAGE_WIDTH - tetromino[0].length) / 2), y: 0 },
          collided: false,
        };
      }
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function usePlayer() {
  const [player, dispatch] = useReducer(reducer, initialPlayer);

  const softDropPlayer = useCallback((collided) => {
    if (collided) {
      dispatch({ type: "COLLIDED" });
    } else {
      dispatch({
        type: "DROP",
        payload: { moveY: 1 },
      });
    }
  }, []);

  const hardDropPlayer = useCallback((moveY) => {
    dispatch({
      type: "DROP",
      payload: { moveY },
    });
    dispatch({ type: "COLLIDED" });
  }, []);

  const movePlayer = useCallback((dir) => {
    dispatch({
      type: "MOVE",
      payload: { moveX: dir },
    });
  }, []);

  const nextPlayer = useCallback(() => {
    dispatch({ type: "NEXT" });
  }, []);

  const rotatePlayer = useCallback((dir, move) => {
    dispatch({
      type: "ROTATE",
      payload: { dir, move },
    });
  }, []);

  const holdPlayer = useCallback(() => {
    dispatch({ type: "HOLD" });
  }, []);

  const resetPlayer = useCallback(() => {
    dispatch({ type: "RESET" });
    dispatch({ type: "NEXT" });
  }, []);

  return {
    player,
    softDropPlayer,
    hardDropPlayer,
    movePlayer,
    nextPlayer,
    rotatePlayer,
    holdPlayer,
    resetPlayer,
  };
}
