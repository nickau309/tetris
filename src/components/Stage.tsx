import { useStore } from "../store";
import { classNames } from "../utils";
import Cell from "./Cell";
import Container from "./Container";

export default function Stage() {
  const stage = useStore((state) => state.stage);

  return (
    <div className="rounded-lg border-8 border-neutral-900 bg-neutral-800">
      <Container width={stage[0].length}>
        {stage
          .slice(2)
          .map((row, i) =>
            row.map((cell, j) => (
              <Cell
                key={`${i}-${j}`}
                className={classNames(
                  "w-6 border-4",
                  (cell.type === "0" || cell.type === "X") && "bg-gray-500/10",
                )}
                type={cell.type}
              />
            )),
          )}
      </Container>
    </div>
  );
}
