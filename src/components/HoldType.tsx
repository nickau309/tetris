import { useStore } from "../store";
import Display from "./Display";
import TetroDisplay from "./TetroDisplay";
import TextDescription from "./TextDescription";

export default function HoldType() {
  const type = useStore((state) => state.holdTetro.type);

  return (
    <Display>
      <TextDescription text="HOLD" />
      <TetroDisplay type={type} />
    </Display>
  );
}
