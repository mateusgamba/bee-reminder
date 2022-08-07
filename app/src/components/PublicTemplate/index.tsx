import React from 'react';
import { Container } from 'reactstrap';
import { useOutlet } from 'react-router-dom';
import './style.css';

export default function PublicTemplate(): JSX.Element {
  const outlet = useOutlet();

  return (
    <section className="public-template">
      <Container>
        <main className="d-flex align-items-center">{outlet}</main>
      </Container>
    </section>
  );
}
