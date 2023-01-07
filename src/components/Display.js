import React from "react";

export default function Display({ children }) {
  return (
    <div className="grid grid-flow-row auto-rows-min gap-2">{children}</div>
  );
}
