import { State } from './state';
import { Diagnosis, Patient, Entry } from '../types';
import cloneDeep from 'lodash.clonedeep';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_CHOSEN_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_CHOSEN_PATIENT':
      const clonedChosenPatient = cloneDeep(action.payload);
      return {
        ...state,
        chosenPatient: { ...clonedChosenPatient },
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: [...action.payload],
      };
    case 'ADD_ENTRY':
      state.chosenPatient.entries.push(action.payload);
      return state;
    default:
      return state;
  }
};

export const setPatientList = (list: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: list };
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setChosenPatient = (patient: Patient): Action => {
  return { type: 'SET_CHOSEN_PATIENT', payload: patient };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSES', payload: diagnoses };
};

export const addEntry = (entry: Entry): Action => {
  return { type: 'ADD_ENTRY', payload: entry };
};
