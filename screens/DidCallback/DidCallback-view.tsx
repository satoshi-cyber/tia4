import React from 'react';

import { CLASS_NAMES } from './DidCallback-constants';
import { useDidCallback } from './DidCallback-hook';

const RedirectCallback: React.FC = () => {
  useDidCallback();

  return (
    <div className={CLASS_NAMES.container}>
      <div className={CLASS_NAMES.spiner} />
    </div>
  );
};

export default RedirectCallback;
