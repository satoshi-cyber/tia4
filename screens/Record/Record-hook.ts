import { useJobQuery } from "@/graphql"
import { del, set } from "idb-keyval"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import Swiper from "swiper"
import useLocalStorage from "use-local-storage"
import { RECORING_STATUS } from "./Record-constants"
import { IsRecorded } from "./Record-types"

import { useReactMediaRecorder } from "./Record-useMediaRecoder"

export const useRecord = () => {
  const [swiper, setSwiper] = useState<Swiper>()
  const [lastSlide, setLastSlide] = useState(false)

  const countDownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>()
  const [countDown, setCoundDown] = useState(-1)

  const router = useRouter()

  const { applyJobId } = router.query

  const [{ fetching, data }] = useJobQuery({ variables: { id: String(applyJobId) }, pause: !Boolean(applyJobId) })

  const questions = useMemo(() => [...data?.job.questions || [], { submit: true }], [data])
  const questionIds = useMemo(() => data?.job.questions.map(question => question.id) || [], [data])

  const [isRecorded, setIsRecorded] = useLocalStorage<IsRecorded>(
    String(applyJobId),
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
    if (!swiper) {
      return
    }

    swiper.on('slideChange', () => {
      if (swiper.realIndex === questions.length - 1) {
        setLastSlide(true)
      } else {
        setLastSlide(false)
      }
    })

  }, [swiper])

  useEffect(() => {
    if (countDown === -1) {
      return
    }

    if (countDown === 0) {
      startRecording()
    }

    if (countDown > 0) {
      countDownTimeout.current = setTimeout(() => setCoundDown(countDown - 1), 1000)
    }

  }, [countDown])

  const loading = fetching || status === 'acquiring_media'

  const buttonProps = {
    swiper,
    status,
    questionIds,
    isRecorded,
    handleStartRecording,
    handleStopRecording,
    handleClearRecording,
    handleHandleNext,
    lastSlide,
    countDown,
  }

  const isRecording = status === RECORING_STATUS

  return {
    fetching,
    questions,
    questionIds,
    previewStream,
    status,
    buttonProps,
    isRecorded,
    setSwiper,
    isRecording,
    lastSlide,
    loading,
    error
  }

}
