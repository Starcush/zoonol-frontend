import { Controller } from 'react-hook-form';
import { Form, Checkbox, Select } from 'antd';

const FormSelect = ({ name, control, error, ...rest }) => {
  const { label, required, errors } = rest;

  return (
    <Form.Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Select {...field} {...rest} />
            {errors?.[label] && <span style={{ color: 'red' }}>{errors[label].message}</span>}
          </>
        )}
      />
    </Form.Item>
  );
};

const FormCheckbox = ({ name, control, error, ...rest }) => {
  const { label, required } = rest;

  return (
    <Form.Item label={label} required={required} valuePropName="checked">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox {...rest} checked={value} onChange={(e) => onChange(e.target.checked)} />
        )}
      />
    </Form.Item>
  );
};

export { FormSelect, FormCheckbox };
