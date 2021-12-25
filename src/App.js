import React from 'react';
import OrderPage from './2-react-shop-test/pages/OrderPage/OrderPage';
import { OrderContextProvider } from './2-react-shop-test/contexts/OrderContext';
import './App.css';

function App() {
  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </div>
  );
}

export default App;
