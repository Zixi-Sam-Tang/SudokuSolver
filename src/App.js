import './App.css';
import { Board } from './Components/Board.jsx'
import { PuzzleContainer } from './Components/PuzzleContainer'

function App() {
  return (
    <div className="App">
      <PuzzleContainer></PuzzleContainer>
      <Board></Board>
    </div>
  );
}

export default App;
