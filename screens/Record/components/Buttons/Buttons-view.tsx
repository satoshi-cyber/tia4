import { Icon, PrimaryButton } from '@/components'

import {
  CLASS_NAMES,
  CLEAR_RECORDING_ICON_PROPS,
  HANDLE_NEXT_ICON_PROPS,
  RECORDING_STATUS,
  RECORD_BUTTON_PROPS,
  STOP_RECORDING_BUTTON_PROPS,
} from './Buttons-constants'
import { useButtons } from './Buttons-hook'
import { ButtonsProps } from './Buttons-types'

const VideoPreview: React.FC<ButtonsProps> = ({
  swiper,
  handleStartRecording,
  handleStopRecording,
  handleClearRecording,
  handleHandleNext,
  questionIds,
  isRecorded,
  status,
  lastSlide,
}) => {
  const { realIndex } = useButtons({ swiper })

  if (lastSlide) {
    return (
      <>
        <p className="absolute w-[80vw] lg:w-[400px] z-10 text-3xl text-gray-100 text-center pointer-events-none drop-shadow-md transform-gpu top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Good luck! click the button to upload the interview!
        </p>
        <div
          className="swiper-button-prev"
          onClick={() => swiper?.slidePrev()}
        />
        <div className="swiper-button-next swiper-button-disabled" />
        <div className={CLASS_NAMES.container}>
          <PrimaryButton title="Upload" className="w-[80px] h-[80px]" />
        </div>
      </>
    )
  }

  return (
    <div className={CLASS_NAMES.container}>
      {!isRecorded[questionIds[realIndex]] && status !== RECORDING_STATUS && (
        <button {...RECORD_BUTTON_PROPS} onClick={handleStartRecording} />
      )}

      {status == RECORDING_STATUS && (
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
  )
}

export default VideoPreview
