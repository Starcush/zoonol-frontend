import { Controller } from 'react-hook-form';
import { Input, Form } from 'antd';

const FormInput = ({ name, control, error, ...rest }) => {
  const { label, required, errors, placeholder } = rest;

  return (
    <Form.Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Input {...field} placeholder={placeholder} />
            {errors?.[label] && <span style={{ color: 'red' }}>{errors[label].message}</span>}
          </>
        )}
      />
    </Form.Item>
  );
};

export { FormInput };
