import type { TetrominoType } from "./index.types";

export type Cell = {
  status: "clear" | "merged";
  type: TetrominoType | "X";
};

export type Row = Cell[];

export type Stage = Row[];
