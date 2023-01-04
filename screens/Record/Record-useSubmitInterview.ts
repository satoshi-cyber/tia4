import Swiper from "swiper"
import { NOT_ENOUGH_VIDEOS_ERROR } from "./Record-constants"

import { IsRecorded } from "./Record-types"

interface SubmitInterviewOptions {
  swiper?: Swiper
  isRecorded: IsRecorded
}

export const useSubmitInterview = ({ isRecorded }: SubmitInterviewOptions) => {

  const submitInterview = async () => {

    if (Object.keys(isRecorded).length === 0) {

      throw NOT_ENOUGH_VIDEOS_ERROR

    }



  }

  return { submitInterview }
}