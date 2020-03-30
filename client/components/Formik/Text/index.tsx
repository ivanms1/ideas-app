import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { FieldProps } from 'formik';

interface TextProps {
  form: FieldProps['form'];
  field: FieldProps['field'];
  type: string;
}

const Text = ({ form, field, type, ...props }: TextProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const lockIcon = (
    <Button
      icon={showPassword ? 'unlock' : 'lock'}
      intent='warning'
      minimal={true}
      onClick={() => setShowPassword(!showPassword)}
    />
  );
  const { setFieldValue } = form;

  return (
    <div>
      {type === 'password' ? (
        <InputGroup
          type={showPassword ? 'text' : 'password'}
          value={field.value}
          rightElement={lockIcon}
          id={field.name}
          onChange={(e: any) => setFieldValue(field.name, e.target.value)}
          {...props}
        />
      ) : (
        <InputGroup
          type={type}
          value={field.value}
          id={field.name}
          onChange={(e: any) => setFieldValue(field.name, e.target.value)}
          {...props}
        />
      )}
    </div>
  );
};

export default Text;
