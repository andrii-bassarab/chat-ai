import { useEffect } from 'react';
import './App.scss';
import { RouterList } from './router';
import { useLocation, useMatch } from 'react-router-dom';
import { useMediaQuery } from './hooks/useMediaQuery';
import { BreakPoints } from './utils/style/breakpoints';
import { RoutesPath } from './router/routes-path';

function App() {
  const { pathname } = useLocation();
  const isMobileDevice = useMediaQuery(BreakPoints.sm);

  const pathIsDocView = useMatch(RoutesPath.docViewGeneric);

  useEffect(() => {
    if (pathIsDocView && isMobileDevice) {
      document.body.classList.add('overflow-hidder');
    } else {
      document.body.classList.remove('overflow-hidder');
    }
  }, [pathname]);

  return <RouterList />;
}

export default App;
