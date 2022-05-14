import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Home from './pages/Home';
import Review from './pages/Review';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import NewNote from "./pages/NewNote";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Home /> },
        { path: 'newnote', element: <NewNote/> },
        { path: 'review', element: <Review /> },
        { path: 'home', element: <Home /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/home/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
