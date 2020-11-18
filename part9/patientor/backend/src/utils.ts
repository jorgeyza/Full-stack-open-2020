/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  HealthCheckRating,
  NewHealthCheckEntry,
  NewOccupationalHealthCareEntry,
  NewHospitalEntry,
  Diagnosis,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn:' + ssn);
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries,
  };
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (
  codes: any
): Array<Diagnosis['code']> | undefined => {
  if (!codes) {
    return undefined;
  }
  const codesArray: string[] = [];
  codes.forEach((code: string) => {
    if (!isString(code)) {
      throw new Error('Incorrect code: ' + code);
    }
    codesArray.push(code);
  });
  return codesArray;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === '' || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const parseSickLeave = (
  sickLeaveObject: any
): { startDate: string; endDate: string } | undefined => {
  if (!sickLeaveObject) {
    return undefined;
  }

  if (
    !sickLeaveObject.startDate ||
    !isString(sickLeaveObject.startDate) ||
    !isDate(sickLeaveObject.startDate)
  ) {
    throw new Error('Incorrect or missing startDate: ' + sickLeaveObject);
  }

  if (
    !sickLeaveObject.endDate ||
    !isString(sickLeaveObject.endDate) ||
    !isDate(sickLeaveObject.endDate)
  ) {
    throw new Error('Incorrect or missing endDate: ' + sickLeaveObject);
  }

  return sickLeaveObject;
};

const parseDischargeObject = (
  dischargeObject: any
): { date: string; criteria: string } => {
  if (!dischargeObject) {
    throw new Error('Incorrect or missing dischargeObject: ' + dischargeObject);
  }

  if (
    !dischargeObject.date ||
    !isString(dischargeObject.date) ||
    !isDate(dischargeObject.date)
  ) {
    throw new Error('Incorrect or missing date: ' + dischargeObject);
  }

  if (!dischargeObject.criteria || !isString(dischargeObject.criteria)) {
    throw new Error('Incorrect or missing criteria: ' + dischargeObject);
  }

  return dischargeObject;
};

export const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};
export const toNewOccupationalHealthCareEntry = (
  object: any
): NewOccupationalHealthCareEntry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
  };
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischargeObject(object.discharge),
  };
};
