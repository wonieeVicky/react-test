import { render } from '@testing-library/react';
import { OrderContextProvider } from './contexts/OrderContext';

// ui: 렌더하고자하는 jsx
// options: wrapper 옵션 이외에 우리가 주고자 하는 다른 옵션들
const customRender = (ui, options) => render(ui, { wrapper: OrderContextProvider, ...options });

// render 메소드 이외에도 tlr에서 제공하는 모든 것을 다시 export
export * from '@testing-library/react';
// 원래 tlr에서 제공하는 render 메소드를 customRender로 override 해주기
export { customRender as render };
