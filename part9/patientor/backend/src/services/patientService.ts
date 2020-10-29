import patientsList from '../../data/patients';
import { NewPatient, PatientIncomplete } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getIncompletePatients = (): PatientIncomplete[] => {
  return patientsList.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): NewPatient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsList.push(newPatient);
  return newPatient;
};

export default {
  getIncompletePatients,
  addPatient,
};
