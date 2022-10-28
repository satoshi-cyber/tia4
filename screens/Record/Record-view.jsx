import { useRef } from 'react'
import { useReactMediaRecorder } from './media'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectCreative } from 'swiper'
import useLocalStorage from 'use-local-storage'
import { set, del } from 'idb-keyval'
import { VideoPreview, VideoPlayer, Buttons } from './components'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'

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

const RecordView = () => {
  const swipeRef = useRef()
  const questions = QUESTIONS
  const [isRecorded, setIsRecorded] = useLocalStorage(
    INTERVIEW_ID,
    [...QUESTIONS].fill(false)
  )

  const onStop = async (_, blob) => {
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
    const realIndex = swipeRef.current?.swiper?.realIndex

    const newRecoded = isRecorded.map((value, i) =>
      i === realIndex ? false : value
    )

    del(QUESTIONS_IDS[swipeRef.current?.swiper?.realIndex])

    setIsRecorded(newRecoded)
  }

  const handleHandleNext = () => {
    swipeRef.current.swiper.slideNext()
  }

  return (
    <>
      <Swiper
        preventClicks
        ref={swipeRef}
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[Pagination, Navigation, EffectCreative]}
        className="absolute flex flex-1 w-full z-10 bg-gray-800"
      >
        {questions.map((question, index) => (
          <SwiperSlide key={index}>
            {
              <div className="flex flex-1 w-full h-screen relative justify-center bg-gray-900">
                {isRecorded[index] && status !== 'recording' ? (
                  <VideoPlayer id={QUESTIONS_IDS[index]} index={index} />
                ) : (
                  <VideoPreview
                    key={previewStream?.id}
                    stream={previewStream}
                  />
                )}
                <p className="absolute w-[80vw] lg:w-[400px] z-10 text-3xl text-gray-100 text-center mt-10 pointer-events-none drop-shadow-md translate-z-0">
                  {question}
                </p>
              </div>
            }
          </SwiperSlide>
        ))}
      </Swiper>
      <Buttons
        swiper={swipeRef.current?.swiper}
        status={status}
        isRecorded={isRecorded}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handleClearRecording={handleClearRecording}
        handleHandleNext={handleHandleNext}
      />
      <div className="fixed bg-red-200 z-20 right-0">
        {JSON.stringify(isRecorded)}
      </div>
    </>
  )
}

export default RecordView
