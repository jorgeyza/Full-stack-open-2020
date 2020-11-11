import React from 'react';
import { Entry } from '../types';
import HealthCheckEntry from './Entries/HealthCheckEntry';
import OccupationalHealthcareEntry from './Entries/OccupationalHealthcareEntry';
import HospitalEntry from './Entries/HospitalEntry';
import { useStateValue } from '../state';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entryData={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entryData={entry} diagnoses={diagnoses} />
      );
    case 'HealthCheck':
      return <HealthCheckEntry entryData={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
