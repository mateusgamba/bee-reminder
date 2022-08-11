import { useOutlet } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './Header';
import HeaderFilters from '../../components/HeaderFilters';
import { UserProvider } from '../../hooks/useUser';
import { UseReminderProvider } from '../../hooks/useReminder';
import styles from './styles.module.scss';

export default function ProtectedTemplate(): JSX.Element {
  const outlet = useOutlet();

  return (
    <UserProvider>
      <UseReminderProvider>
        <div className={styles['page-reminder-background']} />
        <Container className={styles['page-reminder']}>
          <Header />
          <main>
            <HeaderFilters />
            {outlet}
          </main>
        </Container>
      </UseReminderProvider>
    </UserProvider>
  );
}
