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
  DidApplyDialog,
} from './components';

import { useRecord } from './Record-hook';

const RecordView = () => {
  const {
    setSwiper,
    slides,
    buttonProps,
    videos,
    previewStream,
    handleStopRecording,
    questionIds,
    classNames,
    isRecording,
    recordDate,
    loading,
    error,
    didApply,
    swiperOptions,
  } = useRecord();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classNames.container}>
      {didApply && <DidApplyDialog />}
      <div className={classNames.swiperContainer}>
        <Swiper {...swiperOptions} onSwiper={setSwiper}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {
                <div className={classNames.slide}>
                  <SlideBlur />
                  <VideoPreview
                    key={previewStream?.id}
                    stream={previewStream}
                  />
                  {videos[questionIds[index]] && !isRecording && (
                    <VideoPlayer
                      blob={videos[questionIds[index]]}
                      id={questionIds[index]}
                      index={index}
                    />
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
