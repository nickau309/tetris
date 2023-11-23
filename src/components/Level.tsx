import { useStore } from "../store";
import Display from "./Display";
import TextDescription from "./TextDescription";
import TextDisplay from "./TextDisplay";

export default function Level() {
  const level = useStore((state) => state.status.level);

  return (
    <Display>
      <TextDescription text="LEVEL" />
      <TextDisplay text={level} />
    </Display>
  );
}
