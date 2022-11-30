import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Payments from './pages/Payments';
import Swap from './pages/Swap';
import Register from './pages/Register';
import Settings from './pages/Settings';
import ApproveTx from './pages/ApproveTx';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'crypto-requests', element: <Payments /> },
        { path: 'users', element: <UserPage /> },
        { path: 'product', element: <ProductsPage /> },
        { path: 'settings', element: <Settings /> },
        { path: 'crypto-requests/approve-tx/:id', element: <ApproveTx /> },
      ],
    },
    {
      path: 'auth/login',
      element: <LoginPage />,
    },
    {
      path: 'auth/register',
      element: <Register />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
