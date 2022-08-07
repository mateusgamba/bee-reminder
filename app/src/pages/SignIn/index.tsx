import React, { useMemo } from 'react';
import { Row, Col, Button, FormGroup, FormFeedback } from 'reactstrap';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { LOGIN_GQL } from '../../graphql/Auth';
import CustomInput from '../../components/CustomInput';
import { LoginInput } from '../../ts';
import styles from './styles.module.scss';
import LinkTo from '../../components/LinkTo';
import useNavigateTo from '../../components/NavigateTo';

export default function SignIn(): JSX.Element {
  const { setAuthorization } = useAuth();
  const { navigateTo } = useNavigateTo();
  const methods = useForm<LoginInput>();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = methods;

  const [login, { loading: loginLoading, error: errorLogin }] = useMutation(LOGIN_GQL, {
    onCompleted: (response) => {
      setAuthorization(response.login);
      navigateTo('/');
    },
    onError: (error: ApolloError) => {
      if (error?.graphQLErrors?.[0]?.extensions?.category === 'validation') {
        const validations = error?.graphQLErrors?.[0]?.extensions?.validation as Record<string, string[]>;
        Object.keys(validations).forEach((key: string) => {
          switch (key) {
            case 'email':
            case 'password':
              setError(key, { message: validations[key][0], type: 'validate' });
              break;
          }
        });
      }
    },
  });

  const onSubmit = handleSubmit((variables) => {
    login({ variables });
  });

  const errorMessage = useMemo(
    () => errorLogin?.graphQLErrors?.[0].extensions?.category === 'UNAUTHENTICATED' && errorLogin?.message,
    [errorLogin],
  );

  return (
    <div className={styles['box-center']}>
      <div className={styles['box-center-form']}>
        <Row className="no-gutters w-100">
          <Col className="text-center rounded bg-white p-4">
            <h4 className="mb-3">Please sign in</h4>

            {!!errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={onSubmit} noValidate>
              <FormGroup>
                <CustomInput
                  {...register('email', { required: { value: true, message: 'E-mail is a required field.' } })}
                  className="form-control-lg"
                  placeholder="Enter your E-mail"
                  invalid={Boolean(errors.email)}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </FormGroup>

              <FormGroup>
                <CustomInput
                  type="password"
                  {...register('password', { required: { value: true, message: 'Password is a required field.' } })}
                  className="form-control-lg"
                  placeholder="Enter your Password"
                  invalid={Boolean(errors.password)}
                />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>

              <Button className="btn btn-bee-secondary" type="submit" disabled={loginLoading}>
                {loginLoading ? 'Loading...' : 'Access'}
              </Button>
            </form>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <LinkTo to="/">Home</LinkTo>
              </div>
              <div>
                <LinkTo to="/sign-up">Sign up for an account</LinkTo>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
