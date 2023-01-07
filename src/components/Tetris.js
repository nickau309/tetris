import React, { useEffect, useRef, useState } from "react";

// Components
import Stage from "./Stage";
import TextDescription from "./TextDescription";
import TextDisplay from "./TextDisplay";
import Display from "./Display";
import TetroDisplay from "./TetroDisplay";

// Custom Hooks
import usePlayer from "../hooks/usePlayer";
import useStage from "../hooks/useStage";
import useGameStatus from "../hooks/useGameStatus";
import useDropTime from "../hooks/useDropTime";
import useInterval from "../hooks/useInterval";

// Utilities
import {
  calculateShadowDistance,
  checkCollision,
} from "../utilities/gameHelper";
import { TETROMINOS } from "../utilities/tetrominos";
import { wallKick } from "../utilities/wallKick";
import Panel from "./Panel";

export default function Tetris() {
  const [isInit, setIsInit] = useState(true);
  const [highScore, setHighScore] = useState();
  const mainElement = useRef(null);

  const {
    player,
    softDropPlayer,
    hardDropPlayer,
    movePlayer,
    nextPlayer,
    rotatePlayer,
    holdPlayer,
    resetPlayer,
  } = usePlayer();

  const { stage, gameOver, rowsCleared, resetStage, resetRowsCleared } =
    useStage(player, nextPlayer);

  const { score, level, rows, addScore, setIsTSpin, resetGameStatus } =
    useGameStatus(rowsCleared, resetRowsCleared);

  const {
    dropTime,
    startAutoDrop,
    setLockDelayCount,
    setLockDelay,
    stopAutoDrop,
  } = useDropTime(level);

  useEffect(() => {
    if (gameOver && !isInit) {
      setHighScore((prev) => {
        const newHighScore = prev?.slice() ?? new Array(5).fill(0);
        newHighScore.push(score);
        newHighScore.sort((a, b) => b - a).pop();
        return newHighScore;
      });
    }
  }, [gameOver, isInit, score]);

  useEffect(() => {
    const highScore = localStorage.getItem("highScore");
    if (highScore) {
      setHighScore(JSON.parse(highScore));
    }
  }, []);

  useEffect(() => {
    if (highScore) {
      localStorage.setItem("highScore", JSON.stringify(highScore));
    }
  }, [highScore]);

  useInterval(() => {
    softDrop();
  }, dropTime);

  // Stop auto drop when game is over
  if (gameOver && dropTime !== null) {
    stopAutoDrop();
  }

  // When a tetro spawn
  if (player.type !== "0" && player.pos.y === 0) {
    if (!gameOver && dropTime === null) {
      startAutoDrop();
    }
    // If no existing Block is in its path
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      softDropPlayer(false);
    }
  }

  const startGame = () => {
    mainElement.current.focus();
    setIsInit(false);
    resetPlayer();
    resetStage();
    resetGameStatus();
  };

  const softDrop = () => {
    // If it is going to be collided,
    // set the lock delay
    const moveY = calculateShadowDistance(player, stage);
    if (moveY === 1) {
      setLockDelay();
    } else {
      startAutoDrop();
    }

    const isCollided = checkCollision(player, stage, { x: 0, y: 1 });
    softDropPlayer(isCollided);

    if (isCollided) {
      // Reset the lock delay count for the new tetromino
      setLockDelayCount(0);
    } else {
      // Reset the t-spin
      setIsTSpin(false);
    }
  };

  const hardDrop = () => {
    const moveY = calculateShadowDistance(player, stage);
    hardDropPlayer(moveY);
    addScore(moveY * 2);
  };

  const move = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      movePlayer(dir);
    }
  };

  const rotateSimulation = (dir) => {
    // Deep copy of state
    const clonedPlayer = JSON.parse(JSON.stringify(player));

    // Rotate the cloned player
    // dir = 1 means clockwise
    // dir = -1 means anti-clockwise
    clonedPlayer.rotation = (clonedPlayer.rotation + dir + 4) % 4;
    clonedPlayer.tetromino =
      TETROMINOS[clonedPlayer.type].shape[clonedPlayer.rotation];

    // Check wallkick data for possible position
    // for placing rotated tetromino without colliding
    const direction = dir > 0 ? "clockwiseTo" : "antiClockwiseTo";
    for (const pos of wallKick.get(clonedPlayer.type)[direction][
      clonedPlayer.rotation
    ]) {
      if (!checkCollision(clonedPlayer, stage, pos)) {
        return pos;
      }
    }

    return null;
  };

  const rotate = (dir) => {
    if (player.type === "O") {
      return;
    }

    const move = rotateSimulation(dir);

    // If there is a move after the rotate simulation,
    // it is a possible rotation,
    // update the player
    if (move) {
      // If rotation is performed before collided,
      // reset the lock delay
      if (calculateShadowDistance(player, stage) === 0) {
        setLockDelay();
        // If t-spin is performed befoer collided,
        // set IsTspin for score calculation
        if (player.type === "T") {
          setIsTSpin(true);
        }
      } else if (player.type === "T") {
        setIsTSpin(false);
      }

      rotatePlayer(dir, move);
    }
  };

  const handleKeyDown = (e) => {
    if (!gameOver && player.type !== "0") {
      switch (e.code) {
        case "ControlLeft":
        case "KeyZ":
          // Rotate anitclockwise
          if (!e.repeat) {
            rotate(-1);
          }
          break;
        case "Space":
          if (!e.repeat) {
            stopAutoDrop();
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
          stopAutoDrop();
          softDrop();
          addScore(1);
          break;
        case "ShiftLeft":
        case "KeyC":
          if (!player.holdTetro.justHold) {
            holdPlayer();
          }
          break;
      }
    }
  };

  const handleKeyUp = (e) => {
    if (!gameOver && player.type !== "0") {
      if (e.code === "ArrowDown") {
        startAutoDrop();
      }
    }
  };

  return (
    <div
      className="min-h-screen cursor-default bg-gradient-to-b from-sky-400 to-sky-200"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={mainElement}
    >
      <div className="flex min-h-screen items-center justify-center font-mono">
        <div className="relative grid grid-flow-row gap-4 rounded-3xl border-4 border-gray-700 bg-gradient-to-br from-gray-500/90 to-gray-700/90 p-5">
          <div className="mx-40">
            <Display>
              <TextDescription text="SCORE" />
              <TextDisplay text={score} />
            </Display>
          </div>
          <div
            className={`grid grid-flow-col gap-5 transition${
              gameOver ? " blur-[1px]" : ""
            }`}
          >
            <div className="grid grid-flow-row auto-rows-fr">
              <Display>
                <TextDescription text="HOLD" />
                <TetroDisplay type={player.holdTetro.type} />
              </Display>
              <Display>
                <TextDescription text="LEVEL" />
                <TextDisplay text={level} />
              </Display>
              <Display>
                <TextDescription text="ROWS" />
                <TextDisplay text={rows} />
              </Display>
            </div>
            <Stage stage={stage} />
            <Display>
              <TextDescription text="NEXT" />
              {player.nextType.map((type, key) => (
                <TetroDisplay key={key} type={type} />
              ))}
            </Display>
          </div>
          {gameOver && (
            <Panel
              highScore={highScore}
              isInit={isInit}
              startGame={startGame}
            />
          )}
        </div>
      </div>
    </div>
  );
}
