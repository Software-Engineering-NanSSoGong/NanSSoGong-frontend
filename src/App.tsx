import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import { theme, globalStyle } from './styles';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import SideMenuWithToggleButton from './components/SideMenuWithToggleButton';

function App() {
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
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Router />
        <SideMenuWithToggleButton />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
