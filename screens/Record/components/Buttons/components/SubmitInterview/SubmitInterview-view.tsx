import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Icon, Loader } from '@/components';
import 'react-circular-progressbar/dist/styles.css';

import { CLASS_NAMES, DESCRIPTION } from './SubmitInterview-constants';
import { SubmitInterviewProps } from './SubmitInterview-types';
import { ErrorDialog } from './components';
import { useSubmitInterview } from './SubmitInterview-hook';

import Logo from '../../../../../../public/logo-white.svg';

const LastSlide: React.FC<SubmitInterviewProps> = (props) => {
  const {
    isUploading,
    uploadProgres,
    isDialogOpen,
    closeDialog,
    submitInterview,
  } = useSubmitInterview(props);

  return (
    <>
      <ErrorDialog isOpen={isDialogOpen} closeModal={closeDialog} />
      <Logo className={CLASS_NAMES.logo} width={120} />
      <p className={CLASS_NAMES.description}>{DESCRIPTION}</p>
      <div className={CLASS_NAMES.buttonContainer}>
        {isUploading ? (
          <div className={CLASS_NAMES.progressContainer}>
            <CircularProgressbar
              value={uploadProgres}
              text={`${uploadProgres}%`}
              background={false}
            />
          </div>
        ) : (
          <button
            className={CLASS_NAMES.uploadButton}
            onClick={submitInterview}
          >
            <Icon name="HiUpload" size={24} className={CLASS_NAMES.icon} />
          </button>
        )}
      </div>
      {isUploading && <Loader />}
    </>
  );
};

export default LastSlide;
