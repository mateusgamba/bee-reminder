import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import { UseAuthProvider } from './hooks/useAuth';

const App: React.FC = () => {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <UseAuthProvider>
          <Routes />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={false}
          />
        </UseAuthProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
