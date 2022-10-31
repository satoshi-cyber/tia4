import Swiper from "swiper";

import { IsRecorded, StatusMessages } from "../../Record-types";

export interface ButtonsProps {
  swiper?: Swiper
  handleStartRecording: () => void
  handleStopRecording: () => void
  handleClearRecording: () => void
  handleHandleNext: () => void
  isRecorded: IsRecorded
  questionIds: string[]
  status: StatusMessages
}
