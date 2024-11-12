import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import { Layout } from './pages/layout'
import Dashboard from './pages/dashboard/page'
import History from './pages/history/page'
import HistoryDetail from './pages/history/id/page'
import HistoryTrash from './pages/history/trash/page'
import AuthProvider from './components/context/AuthProvider'
import Signup from './pages/signup'
import Error from './pages/error'
import Landing from './pages/landing'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthProvider>
            <Landing />
          </AuthProvider>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthProvider>
            <Login />
          </AuthProvider>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthProvider>
            <Signup />
          </AuthProvider>
        ),
      },
      {
        path: '/history',
        element: (
          <AuthProvider>
            <History />
          </AuthProvider>
        ),
      },
      {
        path: '/history/trash',
        element: (
          <AuthProvider>
            <HistoryTrash />
          </AuthProvider>
        ),
      },
      {
        path: '/history/:id',
        element: (
          <AuthProvider>
            <HistoryDetail />
          </AuthProvider>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        ),
      },
    ],
  },
])

export default router
