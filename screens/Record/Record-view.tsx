import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'

import { VideoPreview, VideoPlayer, Buttons, Loading } from './components'
import { CLASS_NAMES, SWIPER_OPTIONS } from './Record-constants'
import { useRecord } from './Record-hook'
import clsx from 'clsx'

const RecordView = () => {
  const {
    fetching,
    setSwiper,
    questions,
    buttonProps,
    isRecorded,
    previewStream,
    questionIds,
    isRecording,
    lastSlide,
  } = useRecord()

  if (fetching) {
    return <Loading />
  }

  return (
    <div className="absolute w-full h-full overflow-hidden bg-gray-800">
      <div
        className={clsx(
          'w-full h-full absolute transition-all duration-700 transform-gpu',
          lastSlide ? 'blur' : 'blur-none'
        )}
      >
        <Swiper {...SWIPER_OPTIONS} onSwiper={setSwiper}>
          {questions.map((question, index) => (
            <SwiperSlide key={index}>
              {
                <div className={CLASS_NAMES.slide}>
                  {isRecorded[questionIds[index]] && !isRecording ? (
                    <VideoPlayer id={questionIds[index]} index={index} />
                  ) : (
                    <VideoPreview
                      key={previewStream?.id}
                      stream={previewStream}
                    />
                  )}
                  {'question' in question && (
                    <p className={CLASS_NAMES.question}>{question.question}</p>
                  )}
                </div>
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Buttons {...buttonProps} />
      {isRecording && (
        <div className="fixed bg-red-200 z-20 right-0">Recoding</div>
      )}
    </div>
  )
}

export default RecordView
