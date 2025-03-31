import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import SideMenu from './components/SideMenu';

import './index.css'
import { useEffect, useState } from 'react';
import { fetchSession, loginThunk } from './store/sessionReducer';

function Layout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const newErrors = {};
    if (credential.length > 0 && credential.length < 4) {
      newErrors.credential = 'Username or Email must be at least 4 characters';
    }
    if (password.length > 0 && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    setIsButtonDisabled(credential.length < 4 || password.length < 6);
  }, [credential, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCredential("");
    setPassword("");
    setErrors({});

    const response = await dispatch(loginThunk({ credential, password }));

    if (response?.error) {
      setErrors({ message: response.error });
    } else {
      dispatch(fetchSession()); // Ensure session updates
    }
  };

  return (
    <div className="app-div-container">
      {user ? (
        <main className='main-zone'>
          <div className='main-zone-left'>
            <SideMenu />
          </div>
          <div className='main-zone-right'>
            <Outlet />
          </div>
        </main>
      ) : (
        <div className='login-container'>
          <div className='login-form'>
            <form onSubmit={handleLogin} className='login-form'>
              <h1>Log In</h1>
              {errors.message && (
                <p className='error-message'>{errors.message}</p>
              )}
              <div className='login-items'>
                <label id='userName-field'>
                  Username or Email
                  <input
                    type="text"
                    className='login-box'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </label>
                {errors.credential && (
                  <p className='error-message'>{errors.credential}</p>
                )}
                <label id='password-field'>
                  Password
                  <input
                    type="password"
                    className='login-box'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.password && (
                  <p className='error-message'>{errors.password}</p>
                )}
              </div>
              <button type="submit" id='login-button' disabled={isButtonDisabled}>Log In</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;