import React from 'react';

import { CLASS_NAMES } from './Spinner-constants';
import { SpinnerProps } from './Spinner-types';

const OAuthCallback: React.FC<SpinnerProps> = ({ size = 64 }) => (
  <div className={CLASS_NAMES.container}>
    <div className={CLASS_NAMES.spiner} style={{ width: size, height: size }} />
  </div>
);

export default OAuthCallback;
