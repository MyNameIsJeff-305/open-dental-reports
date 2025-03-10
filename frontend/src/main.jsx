import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { ThemeProvider } from './context/ThemeContext';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </ThemeProvider>
  </React.StrictMode>
);