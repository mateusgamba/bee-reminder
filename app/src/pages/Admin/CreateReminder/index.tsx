import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useMutation, ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';
import { CREATE_REMINDER_GQL } from '../../../graphql/Reminders';
import CustomInput from '../../../components/CustomInput';
import { ReminderInput } from '../../../ts';

interface Props {
  toggle: () => void;
}

export default function CreateReminderModal({ toggle }: Props): JSX.Element {
  const onClose = () => {
    methods.reset();
    toggle();
  };

  const methods = useForm<ReminderInput>({
    defaultValues: {
      description: '',
      date: '',
    },
  });

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = methods;

  const [createReminder, { loading }] = useMutation(CREATE_REMINDER_GQL, {
    onError: (error: ApolloError) => {
      const validations = error?.graphQLErrors?.[0]?.extensions?.validation as Record<string, string[]>;
      Object.keys(validations).forEach((key: string) => {
        switch (key) {
          case 'description':
          case 'date':
            setError(key, { message: validations[key][0], type: 'validate' });
            break;
        }
      });
      toast.error('Please correct the following errors and try again');
    },
    onCompleted: () => [toast.success('Registered successfully'), onClose()],
    refetchQueries: ['reminders'],
  });

  const onSubmit = handleSubmit((variables) => {
    const data = {
      ...variables,
    };
    createReminder({ variables: data });
  });

  return (
    <Modal isOpen={true} toggle={onClose}>
      <Form onSubmit={onSubmit} noValidate>
        <ModalHeader toggle={onClose} className="align-items-center">
          Create a New Reminder
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="description">Description</Label>
            <CustomInput
              {...register('description')}
              type="text"
              id="description"
              invalid={errors.description ? true : false}
            />
            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <CustomInput {...register('date')} type="date" id="date" invalid={errors.date ? true : false} />
            {errors.date && <FormFeedback>{errors.date.message}</FormFeedback>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary btn-bee-third" onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary btn-bee-secondary" type="submit" className="ml-3" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
