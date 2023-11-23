import { STAGE_WIDTH, TETROMINOS, WALL_KICK } from "../constants";
import { checkCollision } from "./stage";
import type {
  GameType,
  InitType,
  PlayerGameState,
  PlayerState,
  Stage,
} from "../types";

export function getRandomTetrominoBag(): GameType[] {
  const tetrominos: GameType[] = ["I", "J", "L", "O", "S", "T", "Z"];

  for (let i = tetrominos.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [tetrominos[i], tetrominos[j]] = [tetrominos[j], tetrominos[i]];
  }

  return tetrominos;
}

export function getPlayer(
  stage: Stage,
  type: GameType | InitType,
): PlayerState {
  if (type === "0") {
    return null;
  }

  const rotation = 0;
  const tetromino = TETROMINOS[type][rotation];

  const player = {
    type,
    rotation,
    x: Math.floor((STAGE_WIDTH - tetromino[0].length) / 2),
    y: 0,
  };

  if (!checkCollision(player, stage, { x: 0, y: 1 })) {
    player.y += 1;
  }

  return player;
}

export function getRotatedPlayer(
  player: PlayerGameState,
  stage: Stage,
  dir: 1 | -1,
): PlayerGameState | null {
  if (player.type !== "O") {
    const newPlayer = {
      ...player,
      rotation: (player.rotation + dir + 4) % 4,
    };

    // Check wallkick data for possible position
    // for placing rotated tetromino without colliding
    const direction = dir > 0 ? "clockwiseTo" : "antiClockwiseTo";
    const possiblePos =
      WALL_KICK.get(newPlayer.type)?.[direction][newPlayer.rotation] ?? [];

    for (const pos of possiblePos) {
      if (!checkCollision(newPlayer, stage, pos)) {
        newPlayer.x += pos.x;
        newPlayer.y += pos.y;
        return newPlayer;
      }
    }
  }

  return null;
}
