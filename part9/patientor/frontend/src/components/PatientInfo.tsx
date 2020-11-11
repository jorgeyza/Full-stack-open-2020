import React, { useEffect } from 'react';
import { Patient, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setChosenPatient, setDiagnoses } from '../state/';
import {} from '../state/reducer';
import EntryDetails from './EntryDetails';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

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
      </div>
    </div>
  );
};

export default PatientInfo;
