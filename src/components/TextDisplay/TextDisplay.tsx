import type { TextDisplayProps } from "./TextDisplay.types";

export default function TextDisplay({ text }: TextDisplayProps) {
  return (
    <p className="rounded-full bg-gray-900/95 p-2 text-center text-gray-200">
      {text}
    </p>
  );
}
