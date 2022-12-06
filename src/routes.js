import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import ApproveTx from './pages/ApproveTx';
import ManageMerchant from './pages/ManageMerchant';


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
        { path: 'users/:id', element: <ManageMerchant /> },

        { path: 'settings', element: <Settings /> },
        { path: 'crypto-requests/approve-tx/:id', element: <ApproveTx /> },
      ],
    },
    {
      path: 'auth/login',
      element: <LoginPage />,
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
