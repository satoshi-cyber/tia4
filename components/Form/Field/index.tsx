import dynamic from 'next/dynamic';
import SkeletonField from './SkeletonField';

const Input = dynamic(() => import('./InputField'), {
  ssr: false,
  loading: SkeletonField,
});

const Select = dynamic(() => import('./SelectField'), {
  ssr: false,
  loading: SkeletonField,
});

const TextArea = dynamic(() => import('./TextAreaField'), {
  ssr: false,
  loading: () => <SkeletonField height={62} />,
});

const DebounceField = dynamic(() => import('./DebounceField'), {
  ssr: false,
  loading: SkeletonField,
});

const MarkdownField = dynamic(() => import('./MardownField'), {
  ssr: false,
  loading: () => <SkeletonField height={295} />,
});

export const Field = {
  Input,
  Select,
  TextArea,
  DebounceField,
  MarkdownField,
};
