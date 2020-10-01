import patients from '../../data/patients';
import { PatientIncomplete } from '../types';

const getIncompletePatients = (): PatientIncomplete[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getIncompletePatients,
};
