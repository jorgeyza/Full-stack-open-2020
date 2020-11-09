import React, { useEffect, useState } from 'react';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(singlePatient);
        setPatient(singlePatient);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id]);

  let iconName;
  patient?.gender === 'male' ? (iconName = 'mars') : (iconName = 'venus');

  return (
    <div>
      <h2>
        {patient?.name} <Icon name={iconName as SemanticICONS} />
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientInfo;
