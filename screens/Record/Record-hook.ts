import { del, set } from "idb-keyval"
import { useRef } from "react"
import Swiper from "swiper"
import useLocalStorage from "use-local-storage"
import { useReactMediaRecorder } from "./Record-useMediaRecoder"

const QUESTIONS = [
  'Tell Me About Yourself',
  'Why Are You the Best Person for the Job?',
  'Why Do You Want This Job?',
  'How Has Your Experience Prepared You for This Role?',
  'Why Are You Leaving (or Have Left) Your Job?',
]

const QUESTIONS_IDS = [
  'ce82c314-656a-469a-acd8-5d0da3a32b3f',
  'eb8ca117-57ff-4d46-9c28-6c9b64506d98',
  '600795a7-bcf8-4bda-bd94-7b2025d0f2aa',
  'a4495041-b0de-4d96-8de8-cb8f4287ff7b',
  '3d5ff433-2918-43a0-98f6-e09ef3f940e8',
]

const INTERVIEW_ID = 'c0fbb368-cbca-4673-bef9-48af98e3b556'

export const useRecord = () => {
  const questions = QUESTIONS
  const questionIds = QUESTIONS_IDS

  const swipeRef = useRef<{ swiper: Swiper }>()

  const [isRecorded, setIsRecorded] = useLocalStorage<boolean[]>(
    INTERVIEW_ID,
    questions.map(() => false)
  )

  const onStop = async (_: string, blob: Blob) => {

    if (!swipeRef.current?.swiper) {
      return
    }

    const newRecoded = isRecorded.map((value, index) =>
      swipeRef.current?.swiper?.realIndex === index ? true : value
    )

    set(QUESTIONS_IDS[swipeRef.current?.swiper?.realIndex], blob)

    setIsRecorded(newRecoded)
  }

  const { status, startRecording, stopRecording, previewStream } =
    useReactMediaRecorder({
      video: true,
      askPermissionOnMount: true,
      stopStreamsOnStop: false,
      onStop,
    })

  const handleStartRecording = () => {
    swipeRef.current?.swiper?.disable()
    startRecording()
  }

  const handleStopRecording = () => {
    swipeRef.current?.swiper?.enable()
    stopRecording()
  }

  const handleClearRecording = () => {
    if (!swipeRef.current?.swiper) {
      return
    }

    const realIndex = swipeRef.current?.swiper?.realIndex

    const newRecoded = isRecorded.map((value, i) =>
      i === realIndex ? false : value
    )

    del(QUESTIONS_IDS[swipeRef.current?.swiper?.realIndex])

    setIsRecorded(newRecoded)
  }

  const handleHandleNext = () => {
    swipeRef.current?.swiper.slideNext()
  }

  const buttonProps = {
    swiper: swipeRef.current?.swiper,
    status: status,
    isRecorded: isRecorded,
    handleStartRecording,
    handleStopRecording,
    handleClearRecording,
    handleHandleNext,
  }

  return {
    questions,
    questionIds,
    previewStream,
    swipeRef,
    status,
    buttonProps,
    isRecorded
  }

}
