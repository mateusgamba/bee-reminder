import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { UseReminderProvider } from './hooks/useReminder';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
