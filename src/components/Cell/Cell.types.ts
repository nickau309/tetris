import type { TetrominoType } from "../../types";

export type CellProps = {
  className?: string;
  type: TetrominoType | "X";
};
