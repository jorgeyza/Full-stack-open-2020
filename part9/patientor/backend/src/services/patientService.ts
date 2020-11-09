import patientsList from '../../data/patients';
import { Patient, NewPatient, PatientIncomplete } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getIncompletePatients = (): PatientIncomplete[] => {
  return patientsList.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const getPatient = (id: string): Patient => {
  const targetPatient = patientsList.find((patient) => patient.id === id);
  if (typeof targetPatient === 'undefined') {
    throw new Error('Incorrect or missing patient id');
  }
  return targetPatient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsList.push(newPatient);
  return newPatient;
};

export default {
  getIncompletePatients,
  getPatient,
  addPatient,
};
