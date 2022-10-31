import { useJobQuery } from "@/graphql"
import { del, set } from "idb-keyval"
import { useRouter } from "next/router"
import { useState } from "react"
import Swiper from "swiper"
import useLocalStorage from "use-local-storage"
import { IsRecorded } from "./Record-types"

import { useReactMediaRecorder } from "./Record-useMediaRecoder"


export const useRecord = () => {

  const router = useRouter()

  const { jobId } = router.query

  const [{ fetching, data }] = useJobQuery({ variables: { id: String(jobId) }, pause: !Boolean(jobId) })

  const questions = data?.job.questions.map(question => question.question) || []
  const questionIds = data?.job.questions.map(question => question.id) || []

  const [swiper, setSwiper] = useState<Swiper>()

  const [isRecorded, setIsRecorded] = useLocalStorage<IsRecorded>(
    String(jobId),
    {}
  )

  const onStop = async (_: string, blob: Blob) => {

    if (!swiper || !questionIds || !questionIds[swiper.realIndex]) {
      return
    }

    isRecorded[questionIds[swiper.realIndex]] = true

    set(questionIds[swiper.realIndex], blob)

    setIsRecorded({ ...isRecorded })
  }

  const { status, startRecording, stopRecording, previewStream } =
    useReactMediaRecorder({
      video: true,
      askPermissionOnMount: true,
      stopStreamsOnStop: false,
      onStop,
    })

  const handleStartRecording = () => {
    swiper?.disable()
    startRecording()
  }

  const handleStopRecording = () => {
    swiper?.enable()
    stopRecording()
  }

  const handleClearRecording = () => {
    if (!swiper || !questionIds || !questionIds[swiper.realIndex]) {
      return
    }

    delete isRecorded[questionIds[swiper.realIndex]]

    del(questionIds[swiper.realIndex])

    setIsRecorded({ ...isRecorded })
  }

  const handleHandleNext = () => {
    swiper?.slideNext()
  }

  const buttonProps = {
    swiper,
    status: status,
    questionIds,
    isRecorded,
    handleStartRecording,
    handleStopRecording,
    handleClearRecording,
    handleHandleNext,
  }

  return {
    fetching,
    questions,
    questionIds,
    previewStream,
    setSwiper,
    status,
    buttonProps,
    isRecorded
  }

}
