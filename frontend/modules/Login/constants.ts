import { FieldData } from '@/common/hooks/useForm/types';
import { isValidPassword } from '@/common/hooks/useForm/validators';

export const formStructure: FieldData[] = [
  { name: 'email', required: true, disabled: true, default: '' },
  {
    name: 'password',
    required: true,
    validators: [isValidPassword],
    default: '',
  },
];
