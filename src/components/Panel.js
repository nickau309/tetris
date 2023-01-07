import React from "react";
import ScoreBoard from "./ScoreBoard";
import StartButton from "./StartButton";
import TextDescription from "./TextDescription";

export default function Panel({ highScore, isInit, startGame }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      rounded-3xl border border-neutral-900 bg-gray-100 p-2
      ring-1 ring-neutral-900/30 ring-offset-1 ring-offset-neutral-900/60"
    >
      <div className="rounded-2xl border border-neutral-900 bg-gray-500 p-2">
        <div className="grid w-64 grid-flow-row gap-4 rounded-xl border border-neutral-900 bg-neutral-700 p-4 text-white">
          {isInit || <TextDescription text="Game Over" />}
          {highScore && <ScoreBoard highScore={highScore} />}
          <StartButton onClick={startGame} />
        </div>
      </div>
    </div>
  );
}
