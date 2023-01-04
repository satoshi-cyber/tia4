import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

import {
  VideoPreview,
  VideoPlayer,
  Buttons,
  Loading,
  Error,
  SlideBlur,
  Question,
} from './components';
import { SWIPER_OPTIONS } from './Record-constants';
import { useRecord } from './Record-hook';

const RecordView = () => {
  const {
    setSwiper,
    slides,
    buttonProps,
    isRecorded,
    previewStream,
    handleStopRecording,
    questionIds,
    classNames,
    isRecording,
    recordDate,
    loading,
    error,
  } = useRecord();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.swiperContainer}>
        <Swiper {...SWIPER_OPTIONS} onSwiper={setSwiper}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {
                <div className={classNames.slide}>
                  <SlideBlur />
                  <VideoPreview
                    key={previewStream?.id}
                    stream={previewStream}
                  />
                  {isRecorded[questionIds[index]] && !isRecording && (
                    <VideoPlayer id={questionIds[index]} index={index} />
                  )}
                  {'question' in slide && (
                    <Question
                      onStopRecording={handleStopRecording}
                      question={slide}
                      isRecording={isRecording}
                      recordDate={recordDate}
                    />
                  )}
                </div>
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Buttons {...buttonProps} />
    </div>
  );
};

export default RecordView;
