import Swiper from "swiper";

import { StatusMessages } from "../../Record-types";

export interface ButtonsProps {
  swiper?: Swiper
  handleStartRecording: () => void
  handleStopRecording: () => void
  handleClearRecording: () => void
  handleHandleNext: () => void
  videos: Record<string, Blob>
  deleteVideo: (id: string) => void
  questionIds: string[]
  questions: {
    id: string;
    question: string;
    time: number;
  }[],
  status: StatusMessages
  countDown: number
}
