import { classNames } from "../../utils";
import type { CellProps } from "./Cell.types";

export default function Cell({ className = "", type }: CellProps) {
  let cellTypeClassName;

  switch (type) {
    case "0":
      cellTypeClassName = "border-none";
      break;
    case "I":
      cellTypeClassName =
        "border-t-I border-r-I border-b-I/10 border-l-I/30 bg-I/80";
      break;
    case "J":
      cellTypeClassName =
        "border-t-J border-r-J border-b-J/10 border-l-J/30 bg-J/80";
      break;
    case "L":
      cellTypeClassName =
        "border-t-L border-r-L border-b-L/10 border-l-L/30 bg-L/80";
      break;
    case "O":
      cellTypeClassName =
        "border-t-O border-r-O border-b-O/10 border-l-O/30 bg-O/80";
      break;
    case "S":
      cellTypeClassName =
        "border-t-S border-r-S border-b-S/10 border-l-S/30 bg-S/80";
      break;
    case "T":
      cellTypeClassName =
        "border-t-T border-r-T border-b-T/10 border-l-T/30 bg-T/80";
      break;
    case "Z":
      cellTypeClassName =
        "border-t-Z border-r-Z border-b-Z/10 border-l-Z/30 bg-Z/80";
      break;
    case "X":
      cellTypeClassName = "rounded border-gray-500";
      break;
  }

  return (
    <div
      className={classNames("aspect-square", className, cellTypeClassName)}
    />
  );
}
