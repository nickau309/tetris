import React from "react";
import Container from "./Container";
import Cell from "./Cell";
import { TETROMINOS } from "../utilities/tetrominos";

export default function Tetro({ type }) {
  const tetromino = TETROMINOS[type].shape[0].reduce((acc, row) => {
    if (row.some((col) => col !== "0")) {
      acc.push(row);
    }
    return acc;
  }, []);

  return (
    <Container width={tetromino[0].length}>
      {tetromino.map((row, i) =>
        row.map((type, j) => (
          <Cell key={`${i}-${j}`} className="w-3 border-2" type={type} />
        ))
      )}
    </Container>
  );
}
