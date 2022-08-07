import { Route, Routes } from 'react-router-dom';
import ProtectedTemplate from '../../components/ProtectedTemplate';
import NotFoundPage from '../NotFoundPage';
import Reminders from './Reminders';
import RemindersSearch from './RemindersSearch';

export default function Admin(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<ProtectedTemplate />}>
        <Route element={<Reminders />} index />
        <Route element={<RemindersSearch />} path="/search" />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
