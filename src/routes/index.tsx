import { Route, Routes } from 'react-router-dom';
import { CarouselPage, LoginPage } from '../pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/carousel' element={<CarouselPage />} />
    </Routes>
  );
}

export default Router;
