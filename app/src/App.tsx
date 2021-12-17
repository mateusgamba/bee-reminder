import React, { Suspense } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { UseAuthProvider } from './hooks/useAuth';

const App: React.FC = () => {
  return (
    <Suspense fallback="">
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
    </Suspense>
  );
};

export default App;
