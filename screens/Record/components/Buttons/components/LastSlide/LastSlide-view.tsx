import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Icon } from '@/components';
import 'react-circular-progressbar/dist/styles.css';

import { CLASS_NAMES, DESCRIPTION } from './LastSlide-constants';
import { LastSlideProps } from './LastSlide-types';

import Logo from '../../../../../../public/logo-white.svg';
import { NOT_ENOUGH_VIDEOS_ERROR } from '@/screens/Record/Record-constants';
import { ErrorDialog } from './components';

const LastSlide: React.FC<LastSlideProps> = ({ submitInterview }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const closeErrorDialog = () => setIsErrorDialogOpen(false);

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      await submitInterview();
    } catch (e) {
      if (e === NOT_ENOUGH_VIDEOS_ERROR) {
        setIsErrorDialogOpen(true);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <ErrorDialog isOpen={isErrorDialogOpen} closeModal={closeErrorDialog} />
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

export default LastSlide;
