import { Container } from 'reactstrap';
import { useOutlet } from 'react-router-dom';
import styles from './styles.module.scss';

export default function PublicTemplate(): JSX.Element {
  const outlet = useOutlet();

  return (
    <section className={styles['public-template']}>
      <Container>
        <main className="d-flex align-items-center">{outlet}</main>
      </Container>
    </section>
  );
}
