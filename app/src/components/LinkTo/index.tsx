import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
}

export default function LinkTo({ children, to, className }: Props): JSX.Element {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
