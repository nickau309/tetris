import React from "react";

export default function ScoreBoard({ highScore }) {
  return (
    <div className="mx-6 grid grid-flow-row gap-2 rounded-xl border border-neutral-400 bg-neutral-800 p-2 text-center">
      <p>High Score</p>
      <ol>
        {highScore.map((score, i) => (
          <li key={i} className="odd:bg-neutral-700 even:bg-neutral-600">
            {score}
          </li>
        ))}
      </ol>
    </div>
  );
}
