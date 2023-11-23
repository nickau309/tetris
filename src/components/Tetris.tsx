import { useCallback, useRef } from "react";
import HoldType from "./HoldType";
import Level from "./Level";
import NextTypes from "./NextTypes";
import Panel from "./Panel";
import Rows from "./Rows";
import Score from "./Score";
import Stage from "./Stage";
import { useInterval } from "../hooks";
import { useStore } from "../store";
import { classNames } from "../utils";

export default function Tetris() {
  const mainElement = useRef<HTMLDivElement>(null);

  const isGameOver = useStore((state) => state.isGameOver);
  const autoDrop = useStore((state) => state.autoDrop);
  const hold = useStore((state) => state.hold);
  const move = useStore((state) => state.move);
  const gravityDrop = useStore((state) => state.gravityDrop);
  const softDrop = useStore((state) => state.softDrop);
  const hardDrop = useStore((state) => state.hardDrop);
  const rotate = useStore((state) => state.rotate);
  const resetGame = useStore((state) => state.reset);

  const checkTetro = useCallback(() => {
    if (
      autoDrop !== null &&
      autoDrop.timestamp + autoDrop.dropTime < Date.now()
    ) {
      gravityDrop();
    }
  }, [autoDrop, gravityDrop]);

  useInterval(checkTetro, isGameOver ? null : 20);

  const startGame = useCallback(() => {
    mainElement.current?.focus();
    resetGame();
  }, [resetGame]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isGameOver) {
      switch (e.code) {
        case "ControlLeft":
        case "KeyZ":
          // Rotate anticlockwise
          if (!e.repeat) {
            rotate(-1);
          }
          break;
        case "Space":
          if (!e.repeat) {
            hardDrop();
          }
          break;
        case "ArrowLeft":
          // Move left
          move(-1);
          break;
        case "ArrowUp":
        case "KeyX":
          // Rotate clockwise
          if (!e.repeat) {
            rotate(1);
          }
          break;
        case "ArrowRight":
          // Move right
          move(1);
          break;
        case "ArrowDown":
          softDrop();
          break;
        case "ShiftLeft":
        case "KeyC":
          hold();
          break;
      }
    }
  };

  return (
    <div
      ref={mainElement}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="min-h-screen cursor-default bg-gradient-to-b from-sky-400 to-sky-200"
    >
      <div className="flex min-h-screen items-center justify-center font-mono">
        <div className="relative grid grid-flow-row gap-4 rounded-3xl border-4 border-gray-700 bg-gradient-to-br from-gray-500/90 to-gray-700/90 p-5">
          <div className="mx-40">
            <Score />
          </div>
          <div
            className={classNames(
              "grid grid-flow-col gap-5 transition-[filter]",
              isGameOver && "blur-[1px]",
            )}
          >
            <div className="grid grid-flow-row auto-rows-fr">
              <HoldType />
              <Level />
              <Rows />
            </div>
            <Stage />
            <NextTypes />
          </div>
          {isGameOver && <Panel startGame={startGame} />}
        </div>
      </div>
    </div>
  );
}
