import Router from './routes';
// theme
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import {AuthProvider} from "./auth/auth";

// ----------------------------------------------------------------------


export default function App() {
  return (
      <AuthProvider>
          <ThemeProvider>
              <ScrollToTop />
              <Router />
          </ThemeProvider>
      </AuthProvider>
  );
}
