import type { StartButtonProps } from "./StartButton.types";

export default function StartButton({ onClick }: StartButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-10 rounded-full bg-orange-400 p-4 hover:bg-orange-500"
    >
      Play
    </button>
  );
}
