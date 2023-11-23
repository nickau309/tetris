import { useStore } from "../store";
import Display from "./Display";
import TetroDisplay from "./TetroDisplay";
import TextDescription from "./TextDescription";

export default function NextTypes() {
  const nextTypes = useStore((state) => state.nextTypes);

  return (
    <Display>
      <TextDescription text="NEXT" />
      {nextTypes.slice(0, 5).map((type, key) => (
        <TetroDisplay key={key} type={type} />
      ))}
    </Display>
  );
}
