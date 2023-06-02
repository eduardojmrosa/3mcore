import React from 'react';
import ReactDOM from 'react-dom/client';

// STYLE
import './global.css';

// ROTAS
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// PAGES
import App from './App';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

// CONTEXT API
import { UserProvider } from './contexts/UserContext';
import { BoardProvider } from './contexts/BoardContext';
import { ColumnProvider } from './contexts/ColumnContext';
import { CardProvider } from './contexts/CardContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/home', element: <HomePage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/admin', element: <AdminPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BoardProvider>
        <ColumnProvider>
          <CardProvider>
            <RouterProvider router={router} />
          </CardProvider>
        </ColumnProvider>
      </BoardProvider>
    </UserProvider>
  </React.StrictMode>
);