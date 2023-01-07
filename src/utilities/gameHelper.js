export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 22;

function createCell() {
  return { type: "0", status: "clear" };
}

export function createRow() {
  return [...new Array(STAGE_WIDTH)].map(() => createCell());
}

export function createStage() {
  return [...new Array(STAGE_HEIGHT)].map(() => createRow());
}

export function checkCollision(player, stage, { x: moveX, y: moveY }) {
  for (let y = 0; y < player.tetromino.length; ++y) {
    for (let x = 0; x < player.tetromino[y].length; ++x) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== "0") {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we are moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX].status !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export function calculateShadowDistance(player, stage) {
  // Calculate the shadow distance of current tetromino
  let moveY = 0;
  if (player.type !== "0") {
    while (!checkCollision(player, stage, { x: 0, y: moveY + 1 })) {
      ++moveY;
    }
  }
  return moveY;
}
