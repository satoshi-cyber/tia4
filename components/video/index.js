import { useRef, useEffect, useState } from "react";
import { useReactMediaRecorder } from "./media";
import { Swiper, SwiperSlide } from "swiper/react";
import Logo from "../../public/logo-white.svg";

import { Pagination, Navigation, EffectCreative } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const videoClassName =
  "absolute w-full h-screen min-w-full min-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover";

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
    <div className="bg-purple-800 p-2 rounded-full fixed z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center justif">
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
          <button onClick={handleClearRecording}>Clear Recording</button>
          <button onClick={handleHandleNext} className="ml-2">
            Next
          </button>
        </>
      )}
    </div>
  );
};

const RecordView = () => {
  const swipeRef = useRef();
  const [mediaUrls, setMediaUrls] = useState([,]);

  const realIndex = swipeRef.current?.swiper?.realIndex;

  const onStop = (boblUrl) => {
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
    const newMediaUrls = mediaUrls.map((value, i) =>
      i === realIndex ? null : value
    );

    setMediaUrls(newMediaUrls);
  };

  const handleHandleNext = () => {
    swipeRef.current.swiper.slideNext();
  };

  console.log(previewStream);

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
        <SwiperSlide>
          {
            <div className="flex flex-1 w-full h-screen relative">
              {mediaUrls[0] && status === "stopped" ? (
                <video
                  src={mediaUrls[0]}
                  className={videoClassName}
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              ) : (
                <VideoPreview stream={previewStream} />
              )}
            </div>
          }
        </SwiperSlide>
        <SwiperSlide>
          {
            <div className="flex flex-1 w-full h-screen relative">
              {mediaUrls[1] && status === "stopped" ? (
                <video
                  src={mediaUrls[1]}
                  className={videoClassName}
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              ) : (
                <VideoPreview stream={previewStream} />
              )}
            </div>
          }
        </SwiperSlide>
      </Swiper>
      <Logo className="absolute z-20 top-6 left-6" width={120} />
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
