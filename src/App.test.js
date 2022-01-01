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

  // 주문 완료 페이지
  // 백엔드에서 데이터를 가져오는 동안 loading 문구
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // getByRole이 아닌 findByRole을 사용하는 이유는 주문 완료 페이지에 올 때
  // post request를 보내서 async 작업이 이뤄지고 주문이 성공했습니다. 문구가 나오기 때문
  const completeHeader = await screen.findByRole('heading', {
    name: '주문이 성공했습니다.',
  });
  expect(completeHeader).toBeInTheDocument();

  // 데이터를 받아온 후에 loading 문구는 사라진다.
  const loadingDisappeared = screen.queryByText('loading');
  expect(loadingDisappeared).not.toBeInTheDocument();

  // 첫 페이지로 버튼 클릭
  const firstPageButton = screen.getByRole('button', { name: '첫페이지로' });
  userEvent.click(firstPageButton);
});
