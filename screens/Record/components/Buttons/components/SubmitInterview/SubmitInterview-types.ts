import Swiper from "swiper"

export interface SubmitInterviewProps {
  swiper?: Swiper
  videos: Record<string, Blob>
  deleteVideo: (id: string) => void
  questions: {
    id: string;
    question: string;
    time: number;
  }[]
}
