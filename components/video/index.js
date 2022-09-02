import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useReactMediaRecorder } from "./media";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import * as Icons from "react-icons/hi";
import { Pagination, Navigation, EffectCreative } from "swiper";
import canAutoPlay from "can-autoplay";
import useLocalStorage from "use-local-storage";
import { get, set, del } from "idb-keyval";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const QUESTIONS = [
  "Tell Me About Yourself",
  "Why Are You the Best Person for the Job?",
  "Why Do You Want This Job?",
  "How Has Your Experience Prepared You for This Role?",
  "Why Are You Leaving (or Have Left) Your Job?",
];

const QUESTIONS_IDS = [
  "ce82c314-656a-469a-acd8-5d0da3a32b3f",
  "eb8ca117-57ff-4d46-9c28-6c9b64506d98",
  "600795a7-bcf8-4bda-bd94-7b2025d0f2aa",
  "a4495041-b0de-4d96-8de8-cb8f4287ff7b",
  "3d5ff433-2918-43a0-98f6-e09ef3f940e8",
];

const Icon = ({ name, ...props }) => {
  const IconComponent = Icons[name];

  return <IconComponent {...props} />;
};

const videoClassName =
  "absolute w-screen h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream?.id) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      className={videoClassName}
      playsInline
      autoPlay
      muted
    />
  );
};

const Buttons = ({
  status,
  mediaUrls,
  handleStartRecording,
  handleStopRecording,
  handleClearRecording,
  handleHandleNext,
  swiper,
}) => {
  const [realIndex, setRealIndex] = useState(swiper?.realIndex || 0);

  useEffect(() => {
    swiper?.on("slideChange", () => {
      setRealIndex(swiper.realIndex);
    });
  }, [swiper]);

  return (
    <div className="bg-gray-100 p-2 rounded-full fixed z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center justif">
      {!mediaUrls[realIndex] && status !== "recording" && (
        <button
          onClick={handleStartRecording}
          className="bg-red-600 w-[50px] h-[50px] rounded-full"
        />
      )}

      {status == "recording" && (
        <button
          onClick={handleStopRecording}
          className="bg-red-600 w-[40px] h-[40px] rounded-md shadow-full m-[5px]"
        />
      )}

      {mediaUrls[realIndex] && (
        <>
          <button onClick={handleClearRecording}>
            <Icon name="HiTrash" size={40} className="m-[5px] " />
          </button>
          <button onClick={handleHandleNext} className="ml-[10px] m-[5px] ">
            <Icon name="HiCheck" size={40} />
          </button>
        </>
      )}
    </div>
  );
};

const VidePlayer = ({ id, index }) => {
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    get(id).then((u) => setUrl(URL.createObjectURL(u)));
  }, [id]);

  const swiper = useSwiper();

  const video = useRef();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.on("slideChange", () => {
      if (!video.current) {
        return;
      }

      // if (index === swiper.realIndex) {
      //   canAutoPlay.video().then(({ result }) => {
      //     if (result) {
      //       handlePlay();
      //     }
      //   });

      //   return;
      // }

      video.current.pause();
      setPlaying(false);
    });
  }, [index, swiper]);

  // useLayoutEffect(() => {
  //   if (!url) return;

  //   if (index === swiper.realIndex) {
  //     canAutoPlay.video().then(({ result }) => {
  //       if (result) {
  //         handlePlay();
  //       }
  //     });
  //   } else {
  //     video.current.pause();
  //     setPlaying(false);
  //   }
  // }, [index, swiper.realIndex, url]);

  const handlePlay = () => {
    video.current.play();
    setPlaying(true);
  };

  useEffect(() => {
    if (!url || !video.current) return;

    video.current.currentTime = 0.01;
  }, [url]);

  if (!url) return null;

  return (
    <>
      <video
        ref={video}
        src={url}
        className={videoClassName}
        playsInline
        loop
        muted={!playing}
        autoPlay
      />
      {!playing && (
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 flex items-center justify-center"
          onClick={handlePlay}
        >
          <Icon name="HiVolumeUp" size={100} className="text-gray-100" />
        </button>
      )}
    </>
  );
};

const INTERVIEW_ID = "c0fbb368-cbca-4673-bef9-48af98e3b556";

const RecordView = () => {
  const swipeRef = useRef();
  const questions = QUESTIONS;
  const [mediaUrls, setMediaUrls] = useLocalStorage(
    INTERVIEW_ID,
    [...QUESTIONS].fill(undefined)
  );

  const onStop = async (_, blob) => {
    const newMediaUrls = mediaUrls.map((value, index) =>
      swipeRef.current?.swiper?.realIndex === index ? true : value
    );

    set(QUESTIONS_IDS[swipeRef.current?.swiper?.realIndex], blob);

    setMediaUrls(newMediaUrls);
  };

  const { status, startRecording, stopRecording, previewStream } =
    useReactMediaRecorder({
      video: true,
      askPermissionOnMount: true,
      stopStreamsOnStop: false,
      onStop,
    });

  const handleStartRecording = () => {
    swipeRef.current?.swiper?.disable();
    startRecording();
  };

  const handleStopRecording = () => {
    swipeRef.current?.swiper?.enable();
    stopRecording();
  };

  const handleClearRecording = () => {
    const realIndex = swipeRef.current?.swiper?.realIndex;

    const newMediaUrls = mediaUrls.map((value, i) =>
      i === realIndex ? null : value
    );

    del(QUESTIONS_IDS[swipeRef.current?.swiper?.realIndex]);

    setMediaUrls(newMediaUrls);
  };

  const handleHandleNext = () => {
    swipeRef.current.swiper.slideNext();
  };

  return (
    <>
      <Swiper
        preventClicks
        ref={swipeRef}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[Pagination, Navigation, EffectCreative]}
        className="absolute flex flex-1 w-full z-10 bg-gray-800"
      >
        {questions.map((question, index) => (
          <SwiperSlide key={index}>
            {
              <div className="flex flex-1 w-full h-screen relative justify-center bg-gray-900">
                {mediaUrls[index] && status !== "recording" ? (
                  <VidePlayer id={QUESTIONS_IDS[index]} index={index} />
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
        mediaUrls={mediaUrls}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handleClearRecording={handleClearRecording}
        handleHandleNext={handleHandleNext}
      />
      <div className="fixed bg-red-200 z-20 right-0">
        {JSON.stringify(mediaUrls)}
      </div>
    </>
  );
};

export default RecordView;
