import { SetStateAction } from "react"
import Swiper from "swiper"

import { IsRecorded } from "../../../../Record-types"

export interface SubmitInterviewProps {
  swiper?: Swiper
  isRecorded: IsRecorded
  setIsRecorded: (value: SetStateAction<IsRecorded | undefined>) => void
  questions: {
    id: string;
    question: string;
    time: number;
  }[]
}
