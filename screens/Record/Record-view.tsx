import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'

import { VideoPreview, VideoPlayer, Buttons, Loading } from './components'
import { CLASS_NAMES, SWIPER_OPTIONS } from './Record-constants'
import { useRecord } from './Record-hook'

const RecordView = () => {
  const {
    fetching,
    setSwiper,
    questions,
    status,
    buttonProps,
    isRecorded,
    previewStream,
    questionIds,
    isRecording,
  } = useRecord()

  if (fetching) {
    return <Loading />
  }

  return (
    <>
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
                <p className={CLASS_NAMES.question}>{question}</p>
              </div>
            }
          </SwiperSlide>
        ))}
      </Swiper>
      <Buttons {...buttonProps} />
      {isRecording && (
        <div className="fixed bg-red-200 z-20 right-0">Recoding</div>
      )}
    </>
  )
}

export default RecordView
