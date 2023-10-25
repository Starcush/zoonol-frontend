import { Controller } from 'react-hook-form';
import { Form, Upload } from 'antd';

const FormUpload = ({ name, control, error, ...rest }) => {
  const { label, required } = rest;

  return (
    <Form.Item valuePropName="fileList" label={label} required={required}>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field, formState }) => {
          const imageSelected = Array.isArray(field.value) && field.value.length > 0;
          const fileList = imageSelected
            ? field.value
            : formState.defaultValues?.[label]
            ? [{ url: formState.defaultValues?.[label] }]
            : [];

          return (
            <Upload
              multiple={false}
              beforeUpload={() => false}
              listType="picture-card"
              maxCount={1}
              onChange={(info) => field.onChange(info.fileList)}
              fileList={fileList}
            >
              + Upload
            </Upload>
          );
        }}
      />
    </Form.Item>
  );
};

export { FormUpload };
