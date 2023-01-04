import { SetStateAction } from "react";
import Swiper from "swiper";

import { IsRecorded, StatusMessages } from "../../Record-types";

export interface ButtonsProps {
  swiper?: Swiper
  handleStartRecording: () => void
  handleStopRecording: () => void
  handleClearRecording: () => void
  handleHandleNext: () => void
  isRecorded: IsRecorded
  setIsRecorded: (value: SetStateAction<IsRecorded | undefined>) => void
  questionIds: string[]
  questions: {
    id: string;
    question: string;
    time: number;
  }[],
  status: StatusMessages
  countDown: number
  converting: boolean
}
