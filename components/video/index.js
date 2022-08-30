import { useRef, useEffect, useState } from "react";
import { useReactMediaRecorder } from "./media";
import { Swiper, SwiperSlide } from "swiper/react";
import * as Icons from "react-icons/hi";
import { Pagination, Navigation, EffectCreative } from "swiper";

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

const VidePlayer = ({ src, swiper }) => {
  const ref = useRef();

  useEffect(() => {
    ref.play();

    swiper?.on("slideChange", () => {
      ref.stop();
    });
  }, [swiper]);

  return (
    <video src={src} className={videoClassName} playsInline loop ref={ref} />
  );
};

const RecordView = () => {
  const swipeRef = useRef();
  const questions = QUESTIONS;
  const [mediaUrls, setMediaUrls] = useState([...QUESTIONS].fill(undefined));

  const onStop = (boblUrl) => {
    const realIndex = swipeRef.current?.swiper?.realIndex;
    mediaUrls[realIndex] = boblUrl;
    setMediaUrls(mediaUrls);
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

    setMediaUrls(newMediaUrls);
  };

  const handleHandleNext = () => {
    swipeRef.current.swiper.slideNext();
  };

  return (
    <>
      <Swiper
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
              <div className="flex flex-1 w-full h-screen relative justify-center">
                {mediaUrls[index] && status === "stopped" ? (
                  <VidePlayer
                    swiper={swipeRef.current?.swiper}
                    index={index}
                    src={mediaUrls[index]}
                  />
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
      <div className="fixed bg-red-200 z-20 right-0">{status}</div>
    </>
  );
};

export default RecordView;
