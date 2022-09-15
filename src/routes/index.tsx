import { Route, Routes } from 'react-router-dom';
import { CarouselPage, MainPage } from '../pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/carousel' element={<CarouselPage />} />
    </Routes>
  );
}

export default Router;
