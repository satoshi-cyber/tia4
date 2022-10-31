import { Icon } from '@/components'

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
}) => {
  const { realIndex } = useButtons({ swiper })

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
