import { useStore } from "../store";
import Display from "./Display";
import TextDescription from "./TextDescription";
import TextDisplay from "./TextDisplay";

export default function Rows() {
  const rows = useStore((state) => state.status.rows);

  return (
    <Display>
      <TextDescription text="ROWS" />
      <TextDisplay text={rows} />
    </Display>
  );
}
