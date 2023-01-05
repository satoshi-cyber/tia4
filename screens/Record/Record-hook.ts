import { useJobQuery } from "@/graphql"
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { del, set } from "idb-keyval"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import Swiper from "swiper"
import useLocalStorage from "use-local-storage"
import { v4 as uuidv4 } from 'uuid';

import { ACQUIRING_MEDIA, CLASS_NAMES, RECORING_STATUS } from "./Record-constants"
import { IsRecorded } from "./Record-types"
import { useReactMediaRecorder } from "./Record-useMediaRecoder"

const ffmpeg = createFFmpeg({
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
});

export const useRecord = () => {
  const [ffmpegLoading, setFfmpegLoading] = useState(!MediaRecorder.isTypeSupported('video/mp4') && !ffmpeg.isLoaded())
  const [converting, setConverting] = useState(false)
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

  const updateVideo = (blob: Blob) => {
    if (!swiper)
      return

    set(questionIds[swiper.realIndex], blob)

    isRecorded[questionIds[swiper.realIndex]] = true

    setIsRecorded({ ...isRecorded })
  }

  const onStop = async (_: string, blob: Blob) => {
    if (!swiper || !questionIds || !questionIds[swiper.realIndex]) {
      return
    }

    if (MediaRecorder.isTypeSupported('video/mp4')) {
      updateVideo(blob)

      return
    }

    setConverting(true)

    swiper?.disable()

    if (!ffmpeg.isLoaded())
      await ffmpeg.load()

    const inputFile = `${uuidv4()}.webm`
    const outputFile = `${uuidv4()}.mp4`

    ffmpeg.FS('writeFile', inputFile, await fetchFile(blob));

    if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
      await ffmpeg.run('-i', inputFile, '-c:v', 'copy', outputFile);
    } else {
      await ffmpeg.run('-i', inputFile, '-c:v', 'libx264', '-preset', 'ultrafast', outputFile);
    }

    const data = ffmpeg.FS('readFile', outputFile);

    ffmpeg.FS('unlink', inputFile)
    ffmpeg.FS('unlink', outputFile)

    await ffmpeg.exit()

    updateVideo(new Blob([data], {
      type: 'video/mp4'
    }))

    setConverting(false)

    swiper?.enable()

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

  useEffect(() => {
    if (!MediaRecorder.isTypeSupported('video/mp4') && !ffmpeg.isLoaded()) {
      ffmpeg.load().then(() => setFfmpegLoading(false))
    }
  }, [])

  const loading = fetching || status === ACQUIRING_MEDIA || ffmpegLoading

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
    converting
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
