import React from 'react';
import { FormGroup } from '@blueprintjs/core';
import { FieldProps } from 'formik';

import Text from '../Text';
import Checkbox from '../Checkbox';
import TextArea from '../TextArea';

const inputTypes: any = {
  text: Text,
  email: Text,
  password: Text,
  checkbox: Checkbox,
  textarea: TextArea
};

interface CustomInputProps {
  form: FieldProps['form'];
  field: FieldProps['field'];
  type: string;
  label: string;
  helperText: string;
  labelInfo: string;
  className: string;
}

const CustomInput = ({
  form,
  field,
  type = 'text',
  helperText,
  labelInfo,
  label,
  className,
  ...props
}: CustomInputProps) => {
  const { touched, errors } = form;

  const Component = inputTypes[type];

  return (
    <FormGroup
      label={label}
      className={className}
      labelInfo={labelInfo}
      helperText={
        touched[field.name] && errors[field.name]
          ? errors[field.name]
          : helperText
      }
      labelFor={field.name}
      intent={touched[field.name] && errors[field.name] ? 'danger' : 'none'}
    >
      <Component form={form} field={field} type={type} {...props} />
    </FormGroup>
  );
};

export default CustomInput;
