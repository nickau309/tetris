import { TETROMINOS } from "../constants";

export type TetrominoType = keyof typeof TETROMINOS;

export type InitType = "0";

export type GameType = Exclude<TetrominoType, InitType>;
