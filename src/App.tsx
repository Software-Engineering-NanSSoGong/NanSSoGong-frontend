import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import { theme, globalStyle } from './styles';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import SideMenuWithToggleButton from './components/SideMenuWithToggleButton';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

function App() {
  const [queryClient] = React.useState(() => new QueryClient());

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResizeWindow = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      window.addEventListener('resize', handleResizeWindow);

      return () => {
        window.removeEventListener('resize', handleResizeWindow);
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <RecoilRoot>
          <BrowserRouter>
            <Router />
            <SideMenuWithToggleButton />
          </BrowserRouter>
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
