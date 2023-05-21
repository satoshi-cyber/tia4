import Spinner from '@/components/Spinner';
import React from 'react';

import { CLASS_NAMES } from './Loading-constants';

const Loading: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Spinner />
  </div>
);

export default Loading;
