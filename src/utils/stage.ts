import { STAGE_HEIGHT, STAGE_WIDTH, TETROMINOS } from "../constants";
import type { Cell, PlayerGameState, Row, Stage } from "../types";

function createCell(): Cell {
  return { type: "0", status: "clear" };
}

export function createRow(): Row {
  return new Array(STAGE_WIDTH).fill(null).map(createCell);
}

export function createStage(): Stage {
  return new Array(STAGE_HEIGHT).fill(null).map(createRow);
}

export function updateStage(player: PlayerGameState, prevStage: Stage): Stage {
  const { type, rotation, x, y } = player;

  // Flush the stage
  const newStage: Stage = prevStage.map((row) => {
    const newRow: Row = row.map((cell) => {
      if (cell.status === "clear") {
        return createCell();
      }
      return cell;
    });
    return newRow;
  });

  // Get the shadow distance of current tetromino
  const shadowY = getShadowDistance(player, newStage);

  // Draw the tetromino and the shadow
  const tetromino = TETROMINOS[type][rotation];
  tetromino.forEach((row, j) => {
    row.forEach((type, i) => {
      if (type !== "0") {
        const shadowCell = newStage[y + j + shadowY][x + i];
        shadowCell.type = "X";

        const cell = newStage[y + j][x + i];
        cell.type = type;
      }
    });
  });

  return newStage;
}

export function mergeStage(stage: Stage): Stage {
  const newStage: Stage = stage.map((row) => {
    if (row.some((cell) => cell.type !== "0" && cell.status === "clear")) {
      const newRow: Row = row.map((cell) => {
        if (cell.type !== "0" && cell.status === "clear") {
          const newCell: Cell = { ...cell, status: "merged" };
          return newCell;
        }
        return cell;
      });
      return newRow;
    }
    return row;
  });

  return newStage;
}

export function sweepRows(stage: Stage) {
  // Check if any rows can be sweeped
  let rowsSweeped = 0;

  const newStage = stage.reduce<Stage>((acc, row) => {
    if (row.every((cell) => cell.status === "merged")) {
      ++rowsSweeped;
      acc.unshift(createRow());
    } else {
      acc.push(row);
    }
    return acc;
  }, []);

  return { stage: newStage, rowsSweeped };
}

export function checkCollision(
  player: PlayerGameState,
  stage: Stage,
  { x: moveX, y: moveY }: { x: number; y: number },
) {
  const { type, rotation, x, y } = player;
  const tetromino = TETROMINOS[type][rotation];

  for (let j = 0; j < tetromino.length; ++j) {
    for (let i = 0; i < tetromino[j].length; ++i) {
      // 1. Check that we're on an actual Tetromino cell
      if (tetromino[j][i] !== "0") {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          !stage[y + j + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + j + moveY][x + i + moveX] ||
          // 4. Check that the cell we are moving to isn't set to clear
          stage[y + j + moveY][x + i + moveX].status !== "clear"
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export function checkIfGameIsOver(stage: Stage) {
  for (let rowIndex = 0; rowIndex < 2; ++rowIndex) {
    for (const cell of stage[rowIndex]) {
      if (cell.status === "merged") {
        return true;
      }
    }
  }

  return false;
}

export function getShadowDistance(player: PlayerGameState, stage: Stage) {
  // Calculate the shadow distance of current tetromino
  let moveY = 0;

  while (!checkCollision(player, stage, { x: 0, y: moveY + 1 })) {
    ++moveY;
  }

  return moveY;
}
