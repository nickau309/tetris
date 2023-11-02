import { classNames } from "../../utils";
import type { ContainerProps } from "./Container.types";

export default function Container({ width, children }: ContainerProps) {
  let className = "";

  switch (width) {
    case 2:
      className = "grid-cols-2";
      break;
    case 3:
      className = "grid-cols-3";
      break;
    case 4:
      className = "grid-cols-4";
      break;
    case 10:
      className = "grid-cols-10";
      break;
    default:
      throw new Error("Unexpected Container Width: " + width);
  }

  return <div className={classNames("grid gap-px", className)}>{children}</div>;
}
