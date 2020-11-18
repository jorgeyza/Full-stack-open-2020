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
  discharge: yup
    .object()
    .shape({
      date: yup.date().transform(parseDateString).required('Required'),
      criteria: yup.string().required('Required'),
    })
    .required('Required'),
});

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: undefined,
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
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
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

export default HospitalEntryForm;
