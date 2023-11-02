import { TETROMINOS } from "../../constants";
import Cell from "../Cell";
import Container from "../Container";
import type { TetroProps } from "./Tetro.types";

export default function Tetro({ type }: TetroProps) {
  const tetromino = TETROMINOS[type][0].filter((row) =>
    row.some((col) => col !== "0"),
  );

  return (
    <Container width={tetromino[0].length}>
      {tetromino.map((row, i) =>
        row.map((type, j) => (
          <Cell key={`${i}-${j}`} className="w-3 border-2" type={type} />
        )),
      )}
    </Container>
  );
}
