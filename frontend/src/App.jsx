import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import SideMenu from './components/SideMenu';

import './index.css'

function Layout() {
  return (
    <div className="app-div-container">
      <main className='main-zone'>
        <div className='main-zone-left'>
          <SideMenu />
        </div>
        <div className='main-zone-right'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/patients',
        element: <Patients />
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App;