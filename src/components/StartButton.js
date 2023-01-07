import React from "react";

export default function StartButton({ onClick }) {
  return (
    <button
      className="mx-10 rounded-full bg-orange-400 p-4 hover:bg-orange-500"
      onClick={onClick}
    >
      Play
    </button>
  );
}
