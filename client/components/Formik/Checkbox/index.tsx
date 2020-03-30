import { Checkbox as BPCheckbox } from '@blueprintjs/core';
import { FieldProps } from 'formik';

interface CheckboxProps {
  form: FieldProps['form'];
  field: FieldProps['field'];
  className: string;
  checkboxLabel: string;
}

const Checkbox = ({ form, field, className, checkboxLabel }: CheckboxProps) => {
  const { setFieldValue } = form;
  return (
    <BPCheckbox
      checked={field.value}
      className={className}
      label={checkboxLabel}
      onChange={(e: any) => setFieldValue(field.name, e.target.checked)}
    />
  );
};

export default Checkbox;
