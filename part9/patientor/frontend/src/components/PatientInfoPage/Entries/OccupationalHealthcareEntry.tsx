import React from 'react';
import { Card, Icon, Popup } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { Diagnosis, OccupationalHealthCareEntry } from '../../../types';

const OccupationalHealthcare: React.FC<{
  entryData: OccupationalHealthCareEntry;
  diagnoses: Diagnosis[];
}> = ({ entryData, diagnoses }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entryData.date}
          <Popup
            content="Occupational Healthcare"
            trigger={<Icon name={'stethoscope' as SemanticICONS} />}
          />{' '}
          {entryData.employerName}
        </Card.Header>
        <Card.Meta>{entryData.description}</Card.Meta>
        <Card.Description>
          {entryData.sickLeave ? (
            <>
              <p>Starting day: {entryData.sickLeave?.startDate}</p>
              <p>Leaving day: {entryData.sickLeave?.endDate}</p>
            </>
          ) : null}
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

export default OccupationalHealthcare;
