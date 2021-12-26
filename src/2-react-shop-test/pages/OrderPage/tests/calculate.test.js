import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderContextProvider } from '../../../contexts/OrderContext';
import Type from '../Type';

test("update product's total when products change", async () => {
  render(<Type orderType="products" />, { wrapper: OrderContextProvider });

  // 여행 상품 가격은 0원부터 시작한다.
  const productsTotal = screen.getByText('총 가격:', { exact: false }); // 상품 총 가격: 뒤에 다른 텍스트가 있어도 값을 가져옴
  expect(productsTotal).toHaveTextContent('0');

  // 아메리카 여행 상품 한 개 올리기
  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');

  // 영국 여행 상품 3개 더 올리기
  const englandInput = await screen.findByRole('spinbutton', {
    name: 'England',
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');
  expect(productsTotal).toHaveTextContent('4000');
});
