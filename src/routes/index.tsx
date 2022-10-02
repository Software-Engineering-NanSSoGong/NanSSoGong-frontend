import { Route, Routes } from 'react-router-dom';
import { CarouselPage, LoginPage, MainPage, OrderPage } from '../pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/carousel' element={<CarouselPage />} />
      <Route path='/order' element={<OrderPage />} />
    </Routes>
  );
}

export default Router;
