import Text from '@/components/Text';
import React from 'react';

import { CLASS_NAMES, DESCRIPTION, TITLE } from './Error-constants';
import { ErrorProps } from './Error-types';

const Error: React.FC<ErrorProps> = ({ error }) => (
  <div className={CLASS_NAMES.container}>
    <Text text={TITLE} className={CLASS_NAMES.title} />
    <Text text={`(${error})`} className={CLASS_NAMES.error} />
    <Text text={DESCRIPTION} className={CLASS_NAMES.description} />
  </div>
);

export default Error;
