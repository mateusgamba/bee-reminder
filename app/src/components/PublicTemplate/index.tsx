import React from 'react';
import { Container } from 'reactstrap';
import './style.css';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function PublicTemplate({ children }: Props): JSX.Element {
  return (
    <section className="public-template">
      <Container>
        <main className="d-flex align-items-center">{children}</main>
      </Container>
    </section>
  );
}
