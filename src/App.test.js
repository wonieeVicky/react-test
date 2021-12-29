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
  const englandInput = screen.getByRole('spinbutton', { name: 'England' });
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
});
