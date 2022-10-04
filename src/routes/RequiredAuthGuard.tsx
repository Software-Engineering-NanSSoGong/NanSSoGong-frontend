import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuth as RecoilIsAuth } from '../stores';

interface RequiredAuthValue {
  to?: string;
}

const RequiredAuthGuard = ({ to = '/' }: RequiredAuthValue) => {
  const isAuth = useRecoilValue(RecoilIsAuth);

  if (!isAuth) {
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
};

export default RequiredAuthGuard;
