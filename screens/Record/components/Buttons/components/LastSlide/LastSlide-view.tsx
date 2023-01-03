import React from 'react';
import { ButtonIcon } from '@/components';

import { CLASS_NAMES, DESCRIPTION } from './LastSlide-constants';

import Logo from '../../../../../../public/logo-white.svg';

const Loading: React.FC = () => (
  <>
    <Logo className={CLASS_NAMES.logo} width={120} />
    <p className={CLASS_NAMES.description}>{DESCRIPTION}</p>
    <div className={CLASS_NAMES.buttonContainer}>
      <div className={CLASS_NAMES.uploadButton}>
        <ButtonIcon name="HiUpload" size={24} />
      </div>
    </div>
  </>
);

export default Loading;
