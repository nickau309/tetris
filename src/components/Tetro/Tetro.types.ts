import type { TetrominoType } from "../../types";

export type TetroProps = {
  type: Exclude<TetrominoType, "0">;
};
