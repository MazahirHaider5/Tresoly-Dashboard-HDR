import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/configureStore';
import { AuthProvider } from './routes/AuthContext';
import GlobalErrorHandler from './pages/GlobalErrorHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalErrorHandler />
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);