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
  QuestionTime,
  SlideBlur,
  Question,
} from './components';
import { SWIPER_OPTIONS } from './Record-constants';
import { useRecord } from './Record-hook';

const RecordView = () => {
  const {
    setSwiper,
    questions,
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
          {questions.map((question, index) => (
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
                  {'question' in question && (
                    <div className={classNames.questionWrapper}>
                      <Question
                        question={question.question}
                        isRecording={isRecording}
                      />
                      {isRecording && (
                        <QuestionTime
                          recordDate={recordDate}
                          onStopRecording={handleStopRecording}
                          time={question.time}
                        />
                      )}
                    </div>
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
