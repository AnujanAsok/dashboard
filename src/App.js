import { useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  const [status, setStatus] = useState({});
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router setStatus={setStatus} status={status} />
    </ThemeProvider>
  );
}
