import express from 'express';
import patientService from '../services/patientService';
import {
  toNewPatient,
  toNewHealthCheckEntry,
  toNewOccupationalHealthCareEntry,
  toNewHospitalEntry,
} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getIncompletePatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    switch (req.body.type) {
      case 'HealthCheck':
        const newHealthCheckEntry = toNewHealthCheckEntry(req.body);
        const addedHealthCheckEntry = patientService.addEntry(
          req.params.id,
          newHealthCheckEntry
        );
        res.json(addedHealthCheckEntry);
        break;
      case 'OccupationalHealthcare':
        const newOccupationalHealthcareEntry = toNewOccupationalHealthCareEntry(
          req.body
        );
        const addedOccupationalHealthcareEntry = patientService.addEntry(
          req.params.id,
          newOccupationalHealthcareEntry
        );
        res.json(addedOccupationalHealthcareEntry);
        break;
      case 'Hospital':
        const newHospitalEntry = toNewHospitalEntry(req.body);
        const addedHospitalEntry = patientService.addEntry(
          req.params.id,
          newHospitalEntry
        );
        res.json(addedHospitalEntry);
        break;
      default:
        throw new Error('Wrong or missing entry type: ' + req.body.type);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
