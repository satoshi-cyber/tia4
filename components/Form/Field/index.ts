import Input from './InputField';
import Select from './SelectField';
import TextArea from './TextAreaField';
import DebounceField from './DebounceField';
import dynamic from 'next/dynamic';

const MarkdownField = dynamic(() => import('./MardownField'), { ssr: false });

export const Field = {
  Input,
  Select,
  TextArea,
  DebounceField,
  MarkdownField,
};
