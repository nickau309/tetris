import React from "react";

export default function Container({ width, children }) {
  let className = "grid gap-px";

  switch (width) {
    case 2:
      className += " grid-cols-2";
      break;
    case 3:
      className += " grid-cols-3";
      break;
    case 4:
      className += " grid-cols-4";
      break;
    case 10:
      className += " grid-cols-10";
      break;
    default:
      throw new Error("Unexpected Container Width: " + width);
  }

  return <div className={className}>{children}</div>;
}
