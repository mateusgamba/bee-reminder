import React from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { LOGOUT_GQL } from '../../../graphql/Auth';
import useAuth from '../../../hooks/useAuth';

export default function NavBarPrimary(): JSX.Element {
  const history = useHistory();

  const { clearAuthorization } = useAuth();

  const [logout] = useMutation(LOGOUT_GQL, {
    onCompleted: async () => {
      await clearAuthorization();
      history.push('/');
    },
    onError: (error: ApolloError) => {
      console.log(error);
    },
  });

  const onLogout = () => {
    logout();
  };

  return (
    <div>
      <Navbar color="light" light expand="md" className="mb-3">
        <NavbarBrand href="/">Bee Remider</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <Button onClick={onLogout}>Log out</Button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
