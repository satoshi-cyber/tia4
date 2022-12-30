import { ButtonIcon, Icon } from '@/components';

import {
  CLASS_NAMES,
  CLEAR_RECORDING_ICON_PROPS,
  HANDLE_NEXT_ICON_PROPS,
  RECORDING_STATUS,
  RECORD_BUTTON_PROPS,
  STOP_RECORDING_BUTTON_PROPS,
} from './Buttons-constants';
import { useButtons } from './Buttons-hook';
import { ButtonsProps } from './Buttons-types';

import Logo from '../../../../public/logo-white.svg';

const VideoPreview: React.FC<ButtonsProps> = ({
  swiper,
  handleStartRecording,
  handleStopRecording,
  handleClearRecording,
  handleHandleNext,
  questionIds,
  isRecorded,
  status,
  countDown,
}) => {
  const { realIndex, lastSlide } = useButtons({ swiper });

  if (lastSlide) {
    return (
      <>
        <Logo className="absolute m-4 md:m-6" width={120} />
        <p className="absolute w-[80vw] lg:w-[400px] z-10 text-xl md:text-3xl text-gray-100 text-center pointer-events-none transform-gpu top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Click the button to upload the interview! Good luck!
        </p>
        <div className={CLASS_NAMES.buttonContainer}>
          <div className={CLASS_NAMES.uploadButton}>
            <ButtonIcon name="HiUpload" size={24} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {countDown > 0 && <p className={CLASS_NAMES.countDown}>{countDown}</p>}
      <div className={CLASS_NAMES.buttonContainer}>
        {!isRecorded[questionIds[realIndex]] &&
          status !== RECORDING_STATUS &&
          countDown < 1 && (
            <button {...RECORD_BUTTON_PROPS} onClick={handleStartRecording} />
          )}

        {(status == RECORDING_STATUS || countDown > 0) && (
          <button
            {...STOP_RECORDING_BUTTON_PROPS}
            onClick={handleStopRecording}
          />
        )}

        {isRecorded[questionIds[realIndex]] && (
          <>
            <button onClick={handleClearRecording}>
              <Icon {...CLEAR_RECORDING_ICON_PROPS} />
            </button>
            <button
              onClick={handleHandleNext}
              className={CLASS_NAMES.handleNextButton}
            >
              <Icon {...HANDLE_NEXT_ICON_PROPS} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default VideoPreview;
