import { createContext, useMemo, useState } from 'react';

const OrderContext = createContext();

export function OrderContextProvider(props) {
  // value로 넣을 데이터 만들어주기 (필요한 데이터와 데이터를 업데이트 해줄 함수들)
  // Map은 간단한 키와 값을 서로 연결(매핑)시켜 저장하며 저장된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 함
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const value = useMemo(() => [{ ...orderCounts }], [orderCounts]);

  return <OrderContext.Provider value={value} {...props} />;
}
