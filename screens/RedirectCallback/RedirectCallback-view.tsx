import React from 'react';

import { CLASS_NAMES } from './RedirectCallback-constants';
import { useRedirectCallback } from './RedirectCallback-hook';

const RedirectCallback: React.FC = () => {
  useRedirectCallback();

  return (
    <div className={CLASS_NAMES.container}>
      <div className={CLASS_NAMES.spiner} />
    </div>
  );
};

export default RedirectCallback;
