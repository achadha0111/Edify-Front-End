import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Home from './pages/Home';
import Review from './pages/Review';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Note from "./pages/Note";
import {RequireAuth} from "./auth/auth";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <RequireAuth> <Home /> </RequireAuth> },
        { path: 'note', element: <RequireAuth> <Note/> </RequireAuth> },
        { path: 'review', element: <RequireAuth> <Review /> </RequireAuth> },
        { path: 'home', element: <RequireAuth> <Home /> </RequireAuth> },
        { path: 'note/:id', element: <RequireAuth> <Note/> </RequireAuth>}
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <RequireAuth> <Home /> </RequireAuth>},
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
