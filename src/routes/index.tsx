import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { DinnerService } from '../api';
import FoodService from '../api/FoodService';
import StyleService from '../api/StyleService';
import {
  ClientHistoryOrderPage,
  LoginPage,
  MainPage,
  ModalTestPage,
  ItemDetailPage,
  SignUpSelectUserTypePage,
  SignUpEmailPage,
  SignUpClientInfoPage,
  ProfilePage,
  OrderPage,
  ManageOrderPage,
  ModifyItemDetailPage,
  ManageTimePage,
  ManageIngredientPage,
  IngredientDetailPage,
} from '../pages';
import ToastTestPage from '../pages/ToastTestPage';
import { dinnerNameState } from '../stores';
import { foodState } from '../stores/Food';
import { styleState } from '../stores/Style';
import RequiredAuthGuard from './RequiredAuthGuard';

function Router() {
  const setStyleList = useSetRecoilState(styleState);
  const setFoodState = useSetRecoilState(foodState);
  const setDinnerList = useSetRecoilState(dinnerNameState);

  React.useEffect(() => {
    // style, food initial
    (async () => {
      const styles = await StyleService.getList();
      const foods = await FoodService.getList({ page: 0, size: 200 });
      const dinners = await DinnerService.getDinnerNameWithIdList();
      const foodList = foods.content.map((food) => ({ ...food, foodQuantity: 0 }));
      const dinnerList = dinners.dinnerNameAndIdList.map((dinner) => {
        const [name, id] = dinner.split('/');
        return { name, id: Number(id) };
      });
      setStyleList(styles.content);
      setFoodState(foodList);
      setDinnerList(dinnerList);
    })();
  }, [setDinnerList, setFoodState, setStyleList]);

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/modal' element={<ModalTestPage />} />
      <Route path='/toast' element={<ToastTestPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/signup-type' element={<SignUpSelectUserTypePage />} />
      <Route path='/signup-email' element={<SignUpEmailPage />} />
      <Route path='/signup-client-info' element={<SignUpClientInfoPage />} />
      <Route path='/modify/:id' element={<ModifyItemDetailPage />} />
      <Route path='/item/:id' element={<ItemDetailPage />} />
      <Route path='/history' element={<ClientHistoryOrderPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/order' element={<OrderPage />} />
      <Route path='/manage-order' element={<ManageOrderPage />} />
      <Route path='/manage-time' element={<ManageTimePage />} />
      <Route path='/manage-ingredient' element={<ManageIngredientPage />} />
      <Route path='/ingredient/:id' element={<IngredientDetailPage />} />
      {/* 유저만 갈 수 있는 페이지 example: 내정보페이지 */}
      <Route element={<RequiredAuthGuard />}>
        <Route path='/user' element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
