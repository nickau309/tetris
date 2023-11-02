import type { DisplayProps } from "./Display.types";

export default function Display({ children }: DisplayProps) {
  return (
    <div className="grid grid-flow-row auto-rows-min gap-2">{children}</div>
  );
}
