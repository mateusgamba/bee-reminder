import { useMemo } from 'react';
import { Row, Col, Button, FormFeedback, FormGroup, Label } from 'reactstrap';
import { useMutation, ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import CustomInput from '../../components/CustomInput';
import { RegisterUser } from '../../ts';
import { CREATE_USER_GQL } from '../../graphql/User';
import styles from './styles.module.scss';
import LinkTo from '../../components/LinkTo';
import useNavigateTo from '../../components/NavigateTo';

export default function SignUp(): JSX.Element {
  const { setAuthorization } = useAuth();
  const { navigateTo } = useNavigateTo();
  const methods = useForm<RegisterUser>();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = methods;

  const [createUser, { loading, error: errorSignup }] = useMutation(CREATE_USER_GQL, {
    onCompleted: (response) => {
      toast.success('Your account was created successfully.');
      setAuthorization(response.createUser);
      navigateTo('/');
    },
    onError: (error: ApolloError) => {
      if (errorSignup?.graphQLErrors?.[0].extensions?.category === 'validation') {
        const validations = error?.graphQLErrors?.[0]?.extensions?.validation as Record<string, string[]>;
        Object.keys(validations).forEach((key: string) => {
          switch (key) {
            case 'name':
            case 'email':
            case 'password':
            case 'passwordConfirmation':
              setError(key, { message: validations[key][0], type: 'validate' });
              break;
          }
        });
        toast.error('Please correct the following errors and try again');
      }
    },
  });

  const onSubmit = handleSubmit((variables) => {
    createUser({ variables });
  });

  const errorMessage = useMemo(
    () => errorSignup?.graphQLErrors?.[0].extensions?.category === 'UNAUTHENTICATED' && errorSignup?.message,
    [errorSignup],
  );

  return (
    <div className={styles['box-center']}>
      <div className={styles['box-center-form']}>
        <Row className="no-gutters w-100">
          <Col className="rounded bg-white p-4">
            <h4 className="mb-3 text-center">Create your account</h4>

            {!!errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <p className="sub-title">Remember everything important.</p>
            <form onSubmit={onSubmit} noValidate>
              <FormGroup>
                <Label for="name">Full name</Label>
                <CustomInput
                  {...register('name', { required: { value: true, message: 'Full name is a required field.' } })}
                  className="form-control-lg"
                  placeholder="Enter your Full Name"
                  invalid={Boolean(errors.name)}
                />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </FormGroup>

              <FormGroup>
                <Label for="email">E-mail</Label>
                <CustomInput
                  {...register('email', { required: { value: true, message: 'E-mail is a required field.' } })}
                  className="form-control-lg"
                  placeholder="Enter your E-mail"
                  invalid={Boolean(errors.email)}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <CustomInput
                  type="password"
                  {...register('password', { required: { value: true, message: 'Password is a required field.' } })}
                  className="form-control-lg"
                  placeholder="Enter your Password"
                  invalid={Boolean(errors.password)}
                />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>

              <FormGroup>
                <Label for="passwordConfirmation">Confirm password:</Label>
                <CustomInput
                  type="password"
                  {...register('passwordConfirmation', {
                    required: { value: true, message: 'Confirm Password is a required field.' },
                  })}
                  className="form-control-lg"
                  placeholder="Confirm your Password"
                  invalid={Boolean(errors.passwordConfirmation)}
                />
                {errors.passwordConfirmation && <FormFeedback>{errors.passwordConfirmation.message}</FormFeedback>}
              </FormGroup>

              <div className="text-center">
                <Button className="btn btn-bee-secondary" type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Get start'}
                </Button>
              </div>
            </form>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <LinkTo to="/">Home</LinkTo>
              </div>
              <div>
                Already got an account? <LinkTo to="/sign-in">Sign in</LinkTo>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
