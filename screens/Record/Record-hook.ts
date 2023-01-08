import { useDidApplyQuery, useJobQuery } from "@/graphql"
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import Swiper from "swiper"
import { v4 as uuidv4 } from 'uuid';
import { isAndroid } from 'react-device-detect';

import { ACQUIRING_MEDIA, CLASS_NAMES, RECORING_STATUS, SWIPER_OPTIONS, SWIPER_OPTIONS_ANDROID } from "./Record-constants"

import { useReactMediaRecorder } from "./Record-useMediaRecoder"
import clsx from "clsx";
import { useStoreVideos } from "./Record-useStoreVideos";

const ffmpeg = createFFmpeg({
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
});

export const useRecord = () => {
  const [ffmpegLoading, setFfmpegLoading] = useState(!MediaRecorder.isTypeSupported('video/mp4'))
  const [converting, setConverting] = useState(false)
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

    if (MediaRecorder.isTypeSupported('video/mp4')) {
      storeVideo(questionIds[swiper.realIndex], blob)

      return
    }

    setConverting(true)

    swiper?.disable()

    setTimeout(async () => {

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

      storeVideo(questionIds[swiper.realIndex], new Blob([data], {
        type: 'video/mp4'
      }))

      setConverting(false)

      swiper?.enable()

    }, 300)

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

  useEffect(() => {
    if (!MediaRecorder.isTypeSupported('video/mp4')) {
      if (!ffmpeg.isLoaded()) {
        ffmpeg.load().then(() => setFfmpegLoading(false))
      } else {
        setFfmpegLoading(false)
      }
    }
  }, [])

  const loading = fetching || status === ACQUIRING_MEDIA || ffmpegLoading || didApplyFetching

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
    converting
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
