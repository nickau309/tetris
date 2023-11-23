import { useStore } from "../store";
import Display from "./Display";
import TextDescription from "./TextDescription";
import TextDisplay from "./TextDisplay";

export default function Score() {
  const score = useStore((state) => state.status.score);

  return (
    <Display>
      <TextDescription text="SCORE" />
      <TextDisplay text={score} />
    </Display>
  );
}
