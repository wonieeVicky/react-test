﻿import React, { useContext, useState } from 'react';
import { OrderContext } from '../../contexts/OrderContext';

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDatas] = useContext(OrderContext);

  const productArray = Array.from(orderDatas.products); // 배열 객체 복사
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDatas.options.size > 0;
  let optionRender = null;

  if (hasOptions) {
    const optionsArray = Array.from(orderDatas.options.keys());
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
    optionRender = (
      <>
        <h2>
          옵션: {orderDatas.totals.options}
          <ul>{optionList}</ul>
        </h2>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDatas.totals.products}</h2>
      <ul>{productList}</ul>
      {optionRender}
      <form onSubmit={handleSubmit}>
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} id="confirm-checkbox" />{' '}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type="submit" disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
