import React from 'react';
import { Card, Icon, Popup } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { Diagnosis, HospitalEntry } from '../../../types';

const Hospital: React.FC<{
  entryData: HospitalEntry;
  diagnoses: Diagnosis[];
}> = ({ entryData, diagnoses }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entryData.date}
          <Popup
            content="Hospital"
            trigger={<Icon name={'hospital' as SemanticICONS} />}
          />
        </Card.Header>
        <Card.Meta>{entryData.description}</Card.Meta>
        <Card.Description>
          <p>Discharge date: {entryData.discharge.date}</p>
          <p>Discharge criteria: {entryData.discharge.criteria}</p>
          {entryData.diagnosisCodes ? (
            <>
              <p>Diagnoses:</p>
              <ul>
                {entryData.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    {code}:{' '}
                    {
                      diagnoses.find((diagnosis) => diagnosis.code === code)
                        ?.name
                    }
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Hospital;
