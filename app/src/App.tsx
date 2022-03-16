import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import { ToastContainer } from 'react-toastify';
import { UseAuthProvider } from './hooks/useAuth';

export default function App(): JSX.Element {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <UseAuthProvider>
          <PublicRoutes />
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
}
