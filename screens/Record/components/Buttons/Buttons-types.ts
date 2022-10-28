import Swiper from "swiper";

export interface ButtonsProps {
  swiper?: Swiper
  handleStartRecording: () => void
  handleStopRecording: () => void
  handleClearRecording: () => void
  handleHandleNext: () => void
  isRecorded: boolean[]
  status: | "media_aborted"
  | "permission_denied"
  | "no_specified_media_found"
  | "media_in_use"
  | "invalid_media_constraints"
  | "no_constraints"
  | "recorder_error"
  | "idle"
  | "acquiring_media"
  | "delayed_start"
  | "recording"
  | "stopping"
  | "stopped"
  | "paused";
}
