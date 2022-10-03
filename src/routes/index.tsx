import { Route, Routes } from 'react-router-dom';
import { CarouselPage, LoginPage, ModalTestPage } from '../pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/carousel' element={<CarouselPage />} />
      <Route path='/modal' element={<ModalTestPage />} />
    </Routes>
  );
}

export default Router;
