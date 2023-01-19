import React from 'react';
import { Icon } from '@/components';

import { CLASS_NAMES, TITLE, ICON_PROPS } from './CreateJobButton-constants';

const CreateJobButton: React.FC = React.forwardRef((props, ref) => (
  <button ref={ref as any} className={CLASS_NAMES.button} {...props}>
    <Icon {...ICON_PROPS} />
    <p className={CLASS_NAMES.title}>{TITLE}</p>
  </button>
));

export default CreateJobButton;
