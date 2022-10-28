import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'

import { VideoPreview, VideoPlayer, Buttons } from './components'
import { SWIPER_OPTIONS } from './Record-constants'
import { useRecord } from './Record-hook'

const RecordView = () => {
  const {
    swipeRef,
    questions,
    status,
    buttonProps,
    isRecorded,
    previewStream,
    questionIds,
  } = useRecord()

  return (
    <>
      <Swiper {...SWIPER_OPTIONS} ref={swipeRef as any}>
        {questions.map((question, index) => (
          <SwiperSlide key={index}>
            {
              <div className="flex flex-1 w-full h-screen relative justify-center bg-gray-900">
                {isRecorded[index] && status !== 'recording' ? (
                  <VideoPlayer id={questionIds[index]} index={index} />
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
      <Buttons {...buttonProps} />
      <div className="fixed bg-red-200 z-20 right-0">
        {JSON.stringify(isRecorded)}
      </div>
    </>
  )
}

export default RecordView
