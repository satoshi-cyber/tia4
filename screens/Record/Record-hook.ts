import { useJobQuery } from "@/graphql"
import { del, set } from "idb-keyval"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import Swiper from "swiper"
import useLocalStorage from "use-local-storage"

import { ACQUIRING_MEDIA, CLASS_NAMES, RECORING_STATUS } from "./Record-constants"
import { IsRecorded } from "./Record-types"
import { useReactMediaRecorder } from "./Record-useMediaRecoder"

export const useRecord = () => {
  const [swiper, setSwiper] = useState<Swiper>()
  const countDownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>()
  const [countDown, setCoundDown] = useState(-1)
  const [recordDate, setRecordDate] = useState<Date | undefined>(undefined)

  const router = useRouter()

  const applyJobId = String(router.query.applyJobId)

  const [{ fetching, data }] = useJobQuery({ variables: { id: applyJobId }, pause: !Boolean(applyJobId) })

  const questions = useMemo(() => data?.job.questions.map(({ __typename, ...question }) => question) || [], [data])
  const slides = useMemo(() => [...questions, { submit: true }], [questions])
  const questionIds = useMemo(() => data?.job.questions.map(question => question.id) || [], [data])

  const [isRecorded, setIsRecorded] = useLocalStorage<IsRecorded>(
    applyJobId,
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

  const { status, startRecording, stopRecording, previewStream, error } =
    useReactMediaRecorder({
      video: true,
      askPermissionOnMount: true,
      stopStreamsOnStop: false,
      onStop,
    })

  const handleStartRecording = () => {
    swiper?.disable()
    setCoundDown(5)
  }

  const handleStopRecording = () => {
    swiper?.enable()

    if (countDown > 0) {
      setCoundDown(-1)
      if (countDownTimeout.current) {
        clearTimeout(countDownTimeout.current)
      }
      return
    }

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

  useEffect(() => {
    if (countDown === -1) {
      return
    }

    if (countDown === 0) {
      startRecording()
      setRecordDate(new Date())
    }

    if (countDown > 0) {
      countDownTimeout.current = setTimeout(() => setCoundDown(countDown - 1), 1000)
    }

    return () => {
      clearTimeout(countDownTimeout.current)
    }

  }, [countDown])

  const loading = fetching || status === ACQUIRING_MEDIA

  const isRecording = status === RECORING_STATUS

  const buttonProps = {
    swiper,
    status,
    questionIds,
    isRecorded,
    setIsRecorded,
    handleStartRecording,
    handleStopRecording,
    handleClearRecording,
    handleHandleNext,
    questions,
    countDown,
  }

  const classNames = CLASS_NAMES

  return {
    fetching,
    slides,
    questionIds,
    previewStream,
    status,
    buttonProps,
    isRecorded,
    setSwiper,
    handleStopRecording,
    recordDate,
    classNames,
    isRecording,
    loading,
    error,
  }

}
