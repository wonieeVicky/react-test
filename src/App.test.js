import userEvent from '@testing-library/user-event';
import App from './App';
const { render, screen } = require('@testing-library/react');

test('From order to order completion', async () => {
  // App 컴포넌트 안에는 이미 provider가 Wrap되어 있다.
  render(<App />);

  // America 여행 상품 2개 추가
  const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '2');

  // England 여행 상품 3개 추가
  const englandInput = await screen.findByRole('spinbutton', { name: 'England' });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');

  // Insurance 옵션 체크
  const InsuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
  userEvent.click(InsuranceCheckbox);

  // 모든 주문을 한 이후 주문 버튼 클릭!
  const orderButton = screen.getByRole('button', {
    name: '주문하기',
  });
  userEvent.click(orderButton);

  // 주문 확인 페이지
  // 제목
  const summaryHeading = screen.getByRole('heading', { name: '주문 확인' });
  expect(summaryHeading).toBeInTheDocument();

  // 여행 상품 총 가격
  const productsHeading = screen.getByRole('heading', { name: '여행 상품: 5000' });
  expect(productsHeading).toBeInTheDocument();

  // 옵션 총 가격
  const optionsHeading = screen.getByRole('heading', { name: '옵션: 500' });
  expect(optionsHeading).toBeInTheDocument();

  // 특정 상품 나열
  expect(screen.getByText('2 America')).toBeInTheDocument();
  expect(screen.getByText('3 England')).toBeInTheDocument();
  expect(screen.getByText('Insurance')).toBeInTheDocument();

  // 체크 박스 체크
  const confirmCheckbox = screen.getByRole('checkbox', { name: '주문하려는 것을 확인하셨나요?' });
  userEvent.click(confirmCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: '주문 확인',
  });
  userEvent.click(confirmOrderButton);
});
