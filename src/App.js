import React, { useState } from 'react';
import OrderPage from './2-react-shop-test/pages/OrderPage/OrderPage';
import SummaryPage from './2-react-shop-test/pages/SummaryPage/SummaryPage';
import CompletePage from './2-react-shop-test/pages/CompletePage/CompletePage';
import { OrderContextProvider } from './2-react-shop-test/contexts/OrderContext';
import './App.css';

function App() {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompletePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
