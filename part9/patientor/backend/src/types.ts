// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewPatient = Omit<Patient, 'id'>;

export type PatientIncomplete = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthCareEntry = Omit<
  OccupationalHealthCareEntry,
  'id'
>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
