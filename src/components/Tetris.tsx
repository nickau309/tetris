import { useCallback, useRef } from "react";
import { useGame, useGameDispatch } from "../contexts";
import { classNames } from "../utils";
import Display from "./Display";
import Panel from "./Panel";
import Stage from "./Stage";
import TetroDisplay from "./TetroDisplay";
import TextDescription from "./TextDescription";
import TextDisplay from "./TextDisplay";

export default function Tetris() {
  const mainElement = useRef<HTMLDivElement>(null);

  const { isGameOver, holdTetro, nextTypes, stage, status, highScore } =
    useGame();
  const dispatch = useGameDispatch();

  const startGame = useCallback(() => {
    mainElement.current?.focus();
    dispatch({ type: "RESET" });
  }, [dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isGameOver) {
      switch (e.code) {
        case "ControlLeft":
        case "KeyZ":
          // Rotate anticlockwise
          if (!e.repeat) {
            dispatch({ type: "ROTATE", dir: -1 });
          }
          break;
        case "Space":
          if (!e.repeat) {
            dispatch({ type: "HARD_DROP" });
          }
          break;
        case "ArrowLeft":
          // Move left
          dispatch({ type: "MOVE", dir: -1 });
          break;
        case "ArrowUp":
        case "KeyX":
          // Rotate clockwise
          if (!e.repeat) {
            dispatch({ type: "ROTATE", dir: 1 });
          }
          break;
        case "ArrowRight":
          // Move right
          dispatch({ type: "MOVE", dir: 1 });
          break;
        case "ArrowDown":
          dispatch({ type: "SOFT_DROP" });
          dispatch({ type: "ADD_SCORE", score: 1 });
          break;
        case "ShiftLeft":
        case "KeyC":
          dispatch({ type: "HOLD" });
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
            <Display>
              <TextDescription text="SCORE" />
              <TextDisplay text={status.score} />
            </Display>
          </div>
          <div
            className={classNames(
              "grid grid-flow-col gap-5 transition-[filter]",
              isGameOver && "blur-[1px]",
            )}
          >
            <div className="grid grid-flow-row auto-rows-fr">
              <Display>
                <TextDescription text="HOLD" />
                <TetroDisplay type={holdTetro.type} />
              </Display>
              <Display>
                <TextDescription text="LEVEL" />
                <TextDisplay text={status.level} />
              </Display>
              <Display>
                <TextDescription text="ROWS" />
                <TextDisplay text={status.rows} />
              </Display>
            </div>
            <Stage stage={stage} />
            <Display>
              <TextDescription text="NEXT" />
              {nextTypes.slice(0, 5).map((type, key) => (
                <TetroDisplay key={key} type={type} />
              ))}
            </Display>
          </div>
          {isGameOver && <Panel highScore={highScore} startGame={startGame} />}
        </div>
      </div>
    </div>
  );
}
