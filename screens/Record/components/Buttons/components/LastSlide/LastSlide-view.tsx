import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ButtonIcon, Icon } from '@/components';
import 'react-circular-progressbar/dist/styles.css';

import { CLASS_NAMES, DESCRIPTION } from './LastSlide-constants';

import Logo from '../../../../../../public/logo-white.svg';

const Loading: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
  };

  return (
    <>
      <Logo className={CLASS_NAMES.logo} width={120} />
      <p className={CLASS_NAMES.description}>{DESCRIPTION}</p>
      <div className={CLASS_NAMES.buttonContainer}>
        {isUploading ? (
          <div className={CLASS_NAMES.progressContainer}>
            <CircularProgressbar value={0} text={`${0}%`} background={false} />
          </div>
        ) : (
          <button className={CLASS_NAMES.uploadButton} onClick={handleUpload}>
            <Icon name="HiUpload" size={24} className={CLASS_NAMES.icon} />
          </button>
        )}
      </div>
    </>
  );
};

export default Loading;
