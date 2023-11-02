import { GameProvider } from "./contexts";
import Tetris from "./components/Tetris";

export default function App() {
  return (
    <GameProvider>
      <Tetris />
    </GameProvider>
  );
}
