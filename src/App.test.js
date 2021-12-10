import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // App 컴포넌트 렌더링
  render(<App />);
  // screen object를 이용해 원하는 엘리먼트에 접근(접근할 때는 ID로 접근한다.)
  const counterElement = screen.getByTestId('counter');
  // id가 counter인 엘리먼트의 텍스트가 0인지 테스트한다.
  expect(counterElement).toHaveTextContent(0);
});

test('minus button has correct text', () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId('minus-button');
  expect(minusButtonElement).toHaveTextContent('-');
});

test('plus button has correct text', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');
  expect(plusButtonElement).toHaveTextContent('+');
});
