import { fireEvent, render, screen } from '@testing-library/react';
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

test('when the + button is pressed, the counter changes to 1', () => {
  // App 컴포넌트 렌더링
  render(<App />);
  // screen object를 이용해서 원하는 엘리먼트에 접근(접근할 때 ID로 접근)
  const buttonElement = screen.getByTestId('plus-button');
  // click plus button
  fireEvent.click(buttonElement);
  // 카운터가 0 > 1로 변경된다.
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(1);
});

test('when the - button is pressed, the counter changes to 1', () => {
  // App 컴포넌트 렌더링
  render(<App />);
  // screen object를 이용해서 원하는 엘리먼트에 접근(접근할 때 ID로 접근)
  const buttonElement = screen.getByTestId('minus-button');
  // click minus button
  fireEvent.click(buttonElement);
  // 카운터가 0 > -1로 변경된다.
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(-1);
});

test('on/off button has blue color', () => {
  render(<App />);
  const buttonElement = screen.getByTestId('on/off-button');
  expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' });
});

test('Prevent the -, + button from being pressed when the on/off button is clicked', () => {
  // App 컴포넌트를 렌더링 한다.
  render(<App />);
  // screen object를 이용해서 원하는 엘리먼트에 접근(접근할 때 ID로 접근)
  const onOffButtonElement = screen.getByTestId('on/off-button');
  // click onOffbuttonElement button
  fireEvent.click(onOffButtonElement);
  // screen object를 이용해서 원하는 엘리먼트에 접근(접근할 때 ID로 접근)
  const plusButtonElement = screen.getByTestId('plus-button');
  expect(plusButtonElement).toBeDisabled();
});
