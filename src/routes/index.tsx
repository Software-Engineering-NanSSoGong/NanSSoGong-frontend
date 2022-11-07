import { Route, Routes } from 'react-router-dom';
import {
  ClientHistoryOrderPage,
  LoginPage,
  MainPage,
  ModalTestPage,
  ItemDetailPage,
  SignUpSelectUserTypePage,
  SignUpEmailPage,
  SignUpNamePage,
  ProfilePage,
  OrderPage,
} from '../pages';
import RequiredAuthGuard from './RequiredAuthGuard';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/modal' element={<ModalTestPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/signup-type' element={<SignUpSelectUserTypePage />} />
      <Route path='/signup-email' element={<SignUpEmailPage />} />
      <Route path='/signup-name' element={<SignUpNamePage />} />
      <Route path='/item/:id' element={<ItemDetailPage />} />
      <Route path='/history' element={<ClientHistoryOrderPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/order' element={<OrderPage />} />
      {/* 유저만 갈 수 있는 페이지 example: 내정보페이지 */}
      <Route element={<RequiredAuthGuard />}>
        <Route path='/user' element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
