import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryFormValues, HealthCheckEntryForm } from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  type: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => {
  let modalHeaderText = '';
  let addEntryForm = null;
  switch (type) {
    case 'HealthCheckEntry':
      modalHeaderText = 'Health Check Entry';
      addEntryForm = (
        <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      );
      break;
    case 'OccupationalHealthcareEntry':
      modalHeaderText = 'Occupational Healthcare Entry';
      addEntryForm = (
        <OccupationalHealthcareEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      );
      break;
    case 'HospitalEntry':
      modalHeaderText = 'Hospital Entry';
      addEntryForm = (
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      );
      break;
    default:
      break;
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{modalHeaderText}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {addEntryForm}
        {/* <AddEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
