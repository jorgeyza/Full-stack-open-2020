import React from 'react';
import { Card, Icon, Popup } from 'semantic-ui-react';
import {
  SemanticCOLORS,
  SemanticICONS,
} from 'semantic-ui-react/dist/commonjs/generic';
import { Diagnosis, HealthCheckEntry } from '../../../types';

const HealthCheck: React.FC<{
  entryData: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entryData, diagnoses }) => {
  let heartColor = 'grey';
  let heartText = '';
  switch (entryData.healthCheckRating) {
    case 0:
      heartColor = 'green';
      heartText = 'Healthy';
      break;
    case 1:
      heartColor = 'yellow';
      heartText = 'Low risk';
      break;
    case 2:
      heartColor = 'orange';
      heartText = 'High risk';
      break;
    case 3:
      heartColor = 'red';
      heartText = 'Critical risk';
      break;

    default:
      break;
  }
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entryData.date}
          <Popup
            content="Health Check"
            trigger={<Icon name={'doctor' as SemanticICONS} />}
          />
        </Card.Header>
        <Card.Meta>{entryData.description}</Card.Meta>
        <Card.Description>
          <p>
            <Popup
              content={heartText}
              trigger={
                <Icon
                  name={'heart' as SemanticICONS}
                  color={heartColor as SemanticCOLORS}
                  aria-label={heartText}
                />
              }
            />
          </p>
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

export default HealthCheck;
