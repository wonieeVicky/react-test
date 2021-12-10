import { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
        <div>
          <button data-testid="minus-button">-</button>
          <button data-testid="plus-button">+</button>
        </div>
      </header>
    </div>
  );
}

export default App;
