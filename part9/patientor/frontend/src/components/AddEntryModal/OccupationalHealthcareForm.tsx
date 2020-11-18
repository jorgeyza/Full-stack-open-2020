import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import * as yup from 'yup';
import { parse, isDate } from 'date-fns';

import { TextField, DiagnosisSelection } from '../FormField';
import { Entry, EntryType } from '../../types';
import { useStateValue } from '../../state';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

function parseDateString(value: string, originalValue: string) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

const validationSchema = yup.object({
  type: yup.string().required('Required'),
  description: yup.string().required('Required'),
  date: yup.date().transform(parseDateString).required('Required'),
  specialist: yup.string().required('Required'),
  diagnosisCodes: yup.array().of(yup.string()),
  sickLeave: yup.object().shape(
    {
      startDate: yup
        .date()
        .transform(parseDateString)
        .when('endDate', {
          is: (endDate) => endDate,
          then: yup.date().required('Required'),
        }),
      endDate: yup
        .date()
        .transform(parseDateString)
        .when('startDate', {
          is: (startDate) => startDate,
          then: yup.date().required('Required'),
        }),
    },
    [['startDate', 'endDate']]
  ),
});

export const OccupationalHealthcareEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.OccupationalHealthcare,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: undefined,
        sickLeave: undefined,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick entered..."
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick left..."
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareEntryForm;
