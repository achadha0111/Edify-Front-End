import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Home from './pages/Home';
import Review from './pages/Review';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Note from "./pages/Note";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Home /> },
        { path: 'note', element: <Note/> },
        { path: 'review', element: <Review /> },
        { path: 'home', element: <Home /> },
        { path: 'note/:id', element: <Note/>}
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
