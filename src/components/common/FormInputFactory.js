import { FormInput } from '@/components/common/FormInput';
import { FormUpload } from '@/components/common/FormUpload';
import { FormSelect, FormCheckbox } from '@/components/common/FormSelect';

export default function FormInputFactory(props) {
  switch (props.type) {
    case 'input':
      return <FormInput {...props} />;
    case 'upload':
      return <FormUpload {...props} />;
    case 'select':
      return <FormSelect {...props} />;
    case 'checkbox':
      return <FormCheckbox {...props} />;
    default:
      return null;
  }
}
