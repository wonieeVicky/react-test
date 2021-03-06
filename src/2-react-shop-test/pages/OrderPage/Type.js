import axios from 'axios';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import ErrorBanner from '../../components/ErrorBanner';
import { OrderContext } from '../../contexts/OrderContext';
import Options from './Options';
import Products from './Products';

export default function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext);
  const orderTypeKorean = useMemo(() => (orderType === 'products' ? '상품' : '옵션'), [orderType]);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
      // console.error(error);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const ItemComponent = orderType === 'products' ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      // updateItemCount props
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
    />
  ));

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>
        {orderTypeKorean} 총 가격: {orderDatas.totals[orderType]}
      </p>
      <div style={{ display: 'flex', flexDirection: orderType === 'options' && 'column' }}>{optionItems}</div>
    </>
  );
}
