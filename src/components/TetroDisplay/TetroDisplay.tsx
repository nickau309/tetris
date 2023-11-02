import Tetro from "../Tetro";
import type { TetroDisplayProps } from "./TetroDisplay.types";

export default function TetroDisplay({ type }: TetroDisplayProps) {
  return (
    <div className="flex aspect-square w-20 items-center justify-center rounded-2xl border-2 border-gray-300 bg-gray-900">
      {type !== "0" && <Tetro type={type} />}
    </div>
  );
}
