import Swiper from "swiper";

export interface ButtonsProps {
  swiper?: Swiper
  handleStartRecording: () => void
  handleStopRecording: () => void
  handleClearRecording: () => void
  handleHandleNext: () => void
  answersSet: { [key: string]: number }
  status: 'recording' | 'unset'
}
