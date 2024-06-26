import { Field } from 'formik';
import { Option } from './types';

interface Props {
  options: Option[];
  label: string;
  name: string;
  className?: string;
}

const Select = ({ options, label, name, className }: Props) => {
  return (
    <div className={`${!!className && className}`}>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <Field
          as='select'
          id={name}
          name={name}
          className={`min-w-full text-sm block py-2 h-9 px-1 w-full bg-white rounded-md border-0
             text-black shadow-sm ring-1 ring-inset
             ring-gray-300 focus:ring-2 focus:ring-inset
          `}
        >
          {options.map((option: Option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            );
          })}
        </Field>
      </div>
    </div>
  );
};

export default Select;
