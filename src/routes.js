import { Navigate, useRoutes } from 'react-router-dom';
import { useState } from 'react';

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
import Contacts from './pages/Contacts';
import SettingPage from './pages/SettingPage';

// ----------------------------------------------------------------------

export default function Router(props) {
  const { status, setStatus } = props;
  const [onLogin, setOnLogin] = useState(false);
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout status={status} onLogin={onLogin} />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage status={status} setStatus={setStatus} /> },
        { path: 'campaigns', element: <UserPage status={status} /> },
        { path: 'start-a-new-campaign', element: <ProductsPage status={status} /> },
        { path: 'contacts', element: <Contacts /> },
        { path: 'documents', element: <BlogPage /> },
        { path: 'login', element: <LoginPage setStatus={setStatus} setOnLogin={setOnLogin} status={status} /> },
        { path: 'settings', element: <SettingPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage setStatus={setStatus} setOnLogin={setOnLogin} status={status} />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/login" />, index: true },
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
