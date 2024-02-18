import { Layout } from '@/components/Layout';
import { DocView } from '@/pages/docView';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { useUserStore } from '@/store/user';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutesPath } from './routes-path';

export const RouterList = () => {
  const { userId, isAuthorized } = useUserStore();

  return (
    <Routes>
      {!userId || !isAuthorized ? (
        <>
          <Route path={RoutesPath.login} element={<LoginPage />} />
          <Route path='*' element={<Navigate to={RoutesPath.login} />} />
        </>
      ) : (
        <Route path={RoutesPath.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={RoutesPath.docViewGeneric} element={<DocView />} />
          <Route path='*' element={<Navigate to={RoutesPath.home} />} />
        </Route>
      )}
    </Routes>
  );
};
