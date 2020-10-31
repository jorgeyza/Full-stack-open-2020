import patientsList from '../../data/patients';
import {
  Patient,
  NewPatient,
  PatientIncomplete,
  PublicPatient,
} from '../types';
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

const getPublicPatient = (id: string): PublicPatient => {
  const targetPatient = patientsList.find((patient) => patient.id === id);
  if (typeof targetPatient === 'undefined') {
    throw new Error('Incorrect or missing patient id');
  }
  return targetPatient;
  // const publicPatient = {
  //   id: targetPatient.id,
  //   name: targetPatient.name,
  //   occupation: targetPatient.occupation,
  //   gender: targetPatient.gender,
  //   dateOfBirth: targetPatient.dateOfBirth,
  //   entries: targetPatient.entries,
  // };
  // return publicPatient;
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
  getPublicPatient,
  addPatient,
};
