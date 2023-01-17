import { useDidApplyQuery, useJobQuery } from "@/graphql"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import Swiper from "swiper"
import { isAndroid } from 'react-device-detect';
import clsx from "clsx";

import { ACQUIRING_MEDIA, CLASS_NAMES, MEDIA_RECORDER_OPTIONS, RECORING_STATUS, SWIPER_OPTIONS, SWIPER_OPTIONS_ANDROID, VIDEO_CONSTRAINS } from "./Record-constants"
import { useReactMediaRecorder } from "./Record-useMediaRecoder"
import { useStoreVideos } from "./Record-useStoreVideos";

export const useRecord = () => {
  const [swiper, setSwiper] = useState<Swiper>()
  const countDownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>()
  const [countDown, setCoundDown] = useState(-1)
  const [recordDate, setRecordDate] = useState<Date | undefined>(undefined)

  const router = useRouter()

  const jobId = String(router.query.applyJobId)

  const [{ fetching, data }] = useJobQuery({ variables: { id: jobId } })
  const [{ fetching: didApplyFetching, data: didApplyData }] = useDidApplyQuery({ variables: { jobId } })

  const questions = useMemo(() => data?.job.questions.map(({ __typename, ...question }) => question) || [], [data])
  const questionIds = useMemo(() => data?.job.questions.map(question => question.id) || [], [data])

  const slides = useMemo(() => [...questions, { submit: true }], [questions])

  const { videos, storeVideo, deleteVideo } = useStoreVideos(questionIds)

  const onStop = async (_: string, blob: Blob) => {
    if (!swiper || !questionIds || !questionIds[swiper.realIndex]) {
      return
    }

    storeVideo(questionIds[swiper.realIndex], blob)
  }

  const { status, startRecording, stopRecording, previewStream, error } =
    useReactMediaRecorder({
      mediaRecorderOptions: MEDIA_RECORDER_OPTIONS,
      video: VIDEO_CONSTRAINS,
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

    deleteVideo(questionIds[swiper.realIndex])
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

  const loading = fetching || status === ACQUIRING_MEDIA || didApplyFetching

  const isRecording = status === RECORING_STATUS

  const didApply = didApplyData?.didApply

  const buttonProps = {
    swiper,
    status,
    questionIds,
    videos,
    deleteVideo,
    handleStartRecording,
    handleStopRecording,
    handleClearRecording,
    handleHandleNext,
    questions,
    countDown,
  }

  const classNames = { ...CLASS_NAMES, container: clsx(CLASS_NAMES.container, isAndroid && 'android') }

  const swiperOptions = isAndroid ? SWIPER_OPTIONS_ANDROID : SWIPER_OPTIONS

  return {
    fetching,
    slides,
    questionIds,
    previewStream,
    status,
    buttonProps,
    videos,
    setSwiper,
    handleStopRecording,
    recordDate,
    classNames,
    isRecording,
    loading,
    didApply,
    error,
    swiperOptions
  }

}
