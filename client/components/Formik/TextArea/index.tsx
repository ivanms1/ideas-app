import React from 'react';
import { TextArea as BPTextArea } from '@blueprintjs/core';
import { FieldProps } from 'formik';

interface TextAreaProps {
  form: FieldProps['form'];
  field: FieldProps['field'];
  type: string;
}

const TextArea = ({ form, field, type, ...props }: TextAreaProps) => {
  const { setFieldValue } = form;
  return (
    <BPTextArea
      growVertically
      intent='primary'
      onChange={(e: any) => setFieldValue(field.name, e.target.value)}
      value={field.value}
      {...props}
    />
  );
};

export default TextArea;
