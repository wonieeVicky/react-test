import { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
        <div>
          <button data-testid="minus-button" onClick={() => setCounter((count) => count - 1)}>
            -
          </button>
          <button data-testid="plus-button" onClick={() => setCounter((count) => count + 1)}>
            +
          </button>
        </div>
        <div>
          <button data-testid="on/off-button" style={{ backgroundColor: 'blue' }}>
            on/off
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
