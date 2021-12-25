import { createContext, useEffect, useMemo, useState } from 'react';

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

const calculateSubtotal = (orderType, orderCounts) => {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
};

export function OrderContextProvider(props) {
  // value로 넣을 데이터 만들어주기 (필요한 데이터와 데이터를 업데이트 해줄 함수들)
  // Map은 간단한 키와 값을 서로 연결(매핑)시켜 저장하며 저장된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 함
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // 상품 count를 이용한 가격 계산
  const [totals, setTotals] = useState({ products: 0, options: 0, total: 0 });

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCounts);
    const optionsTotal = calculateSubtotal('options', orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };
      console.log('newOrderCount before: ', newOrderCounts);

      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      console.log('newOrderCount after: ', newOrderCounts);
      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
