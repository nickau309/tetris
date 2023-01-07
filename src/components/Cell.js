import React from "react";

export default function Cell({ className = "", type }) {
  let cellTypeClass;
  switch (type) {
    case "0":
      cellTypeClass = "border-none";
      break;
    case "I":
    case "J":
    case "L":
    case "O":
    case "S":
    case "T":
    case "Z":
      cellTypeClass = `border-t-${type} border-r-${type} border-b-${type}/10 border-l-${type}/30 bg-${type}/80`;
      break;
    case "X":
      cellTypeClass = "rounded border-gray-500";
      break;
    default:
      throw new Error("Unknown cell type: " + type);
  }

  return <div className={`aspect-square ${className} ${cellTypeClass}`} />;
}
