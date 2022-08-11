import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UseAuthProvider } from './hooks/useAuth';
import Routing from './Routing';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <UseAuthProvider>
        <Routing />
      </UseAuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
}
