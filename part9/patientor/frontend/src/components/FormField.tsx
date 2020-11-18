import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { Diagnosis, EntryType, Gender } from '../types';

// structure of a single option
export type Option = {
  value: Gender | EntryType;
  label: string;
};

// props for select field component
interface EntrySelectFieldProps {
  name: string;
  label: string;
  options: Option[];
  setFieldValue: FormikProps<{ type: string }>['setFieldValue'];
  setFieldTouched: FormikProps<{ type: string }>['setFieldTouched'];
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: Option[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};

// export const EntrySelectField: React.FC<EntrySelectFieldProps> = ({
//   name,
//   label,
//   options,
//   setFieldValue,
//   setFieldTouched,
// }: EntrySelectFieldProps) => {
//   const field = 'type';

//   const onChange = (
//     _event: React.SyntheticEvent<HTMLElement, Event>,
//     data: FieldProps
//   ) => {
//     setFieldTouched(field, true);
//     setFieldValue(field, data.field.value);
//   };

//   return (
//     <Form.Field>
//       <label>{label}</label>
//       <Field
//         as="select"
//         name={name}
//         className="ui dropdown"
//         onChange={onChange}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label || option.value}
//           </option>
//         ))}
//       </Field>
//     </Form.Field>
//   );
// };

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
