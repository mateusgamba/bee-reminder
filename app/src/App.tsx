import React, { Suspense } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { UseReminderProvider } from './hooks/useReminder';
import { UseAuthProvider } from './hooks/useAuth';
import { getCookie } from './utils/setAuthTokens';

const App: React.FC = () => {
  const authentication = getCookie('bee-authorization');

  return (
    <Suspense fallback="">
      <UseAuthProvider authenticated={authentication}>
        <UseReminderProvider>
          <Routes />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={false}
          />
        </UseReminderProvider>
      </UseAuthProvider>
    </Suspense>
  );
};

export default App;
