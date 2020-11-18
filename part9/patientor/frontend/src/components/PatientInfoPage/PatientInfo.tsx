import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import { Patient, Diagnosis, Entry } from '../../types';
import { apiBaseUrl } from '../../constants';
import {
  useStateValue,
  setChosenPatient,
  setDiagnoses,
  addEntry,
} from '../../state';

import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/HealthCheckEntryForm';

const InfoLoader = () => (
  <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Segment>
);

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ chosenPatient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType, setEntryType] = React.useState<string>('HealthCheckEntry');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setChosenPatient(singlePatient));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id, dispatch]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: allDiagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses/`
        );
        dispatch(setDiagnoses(allDiagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnoses();
  }, [dispatch]);

  let iconName;
  switch (chosenPatient?.gender) {
    case 'male':
      iconName = 'mars';
      break;
    case 'female':
      iconName = 'venus';
      break;
    case 'other':
      iconName = 'other gender horizontal';
      break;
    default:
      iconName = 'question';
      break;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (Object.keys(chosenPatient).length === 0) {
    return <InfoLoader />;
  }

  return (
    <div>
      <div>
        <h2>
          {chosenPatient?.name}{' '}
          <Popup
            content={chosenPatient?.gender}
            trigger={<Icon name={iconName as SemanticICONS} />}
          />
        </h2>
        <p>ssn: {chosenPatient?.ssn}</p>
        <p>occupation: {chosenPatient?.occupation}</p>
      </div>
      <div>
        {chosenPatient.entries.length > 0 ? (
          <>
            <h3>Entries</h3>{' '}
            {chosenPatient?.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
            ))}
          </>
        ) : (
          <h3>No entries</h3>
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          type={entryType}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
        <select onChange={(e) => setEntryType(e.target.value)}>
          <option value="HealthCheckEntry">HealthCheckEntry</option>
          <option value="HospitalEntry">HospitalEntry</option>
          <option value="OccupationalHealthcareEntry">
            OccupationalHealthcareEntry
          </option>
        </select>
      </div>
    </div>
  );
};

export default PatientInfo;
