import { Route, Routes } from 'react-router-dom';
import { CarouselPage, LoginPage, MainPage, ModalTestPage } from '../pages';
import SignupPage from '../pages/SignupPage';
import RequiredAuthGuard from './RequiredAuthGuard';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/carousel' element={<CarouselPage />} />
      <Route path='/modal' element={<ModalTestPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/signup' element={<SignupPage/>}/>
      {/* 유저만 갈 수 있는 페이지 example: 내정보페이지 */}
      <Route element={<RequiredAuthGuard />}>
        <Route path='/user' element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
