import { useSubmitInterviewMutation } from "@/graphql"
import { toast } from "react-toastify"
import Swiper from "swiper"

import { NOT_ENOUGH_VIDEOS_ERROR, TOAST_ERROR, TOAST_OPTIONS } from "./Record-constants"
import { IsRecorded } from "./Record-types"

interface SubmitInterviewOptions {
  swiper?: Swiper
  isRecorded: IsRecorded
  applyJobId: string
  questions: {
    id: string;
    question: string;
    time: number;
  }[]
}

export const useSubmitInterview = ({ isRecorded, applyJobId, questions }: SubmitInterviewOptions) => {
  const [, submitInterviewMutation] = useSubmitInterviewMutation()

  const submitInterview = async () => {

    if (Object.keys(isRecorded).length === 0) {
      throw NOT_ENOUGH_VIDEOS_ERROR
    }

    const answers = questions.filter(question => isRecorded[question.id]).map(question => ({ question }))

    const res = await submitInterviewMutation({ input: { jobId: applyJobId, answers } })

    if (res.error) {

      toast.error(TOAST_ERROR, TOAST_OPTIONS)

      return
    }

  }

  return { submitInterview }
}