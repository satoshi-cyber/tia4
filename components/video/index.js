import { useRef, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Swiper, SwiperSlide } from "swiper/react";

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
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }
  return (
    <video ref={videoRef} className={videoClassName} playsInline autoPlay />
  );
};

const RecordView = () => {
  const swipeRef = useRef();
  const [mediaUrls, setMediaUrls] = useState([,]);

  const onStop = (boblUrl) => {
    mediaUrls[swipeRef.current?.swiper?.realIndex] = boblUrl;
    setMediaUrls(mediaUrls);
  };

  const { status, startRecording, stopRecording, previewStream } =
    useReactMediaRecorder({
      video: true,
      askPermissionOnMount: true,
      onStop,
      stopStreamsOnStop: false,
    });

  const handleStartRecording = () => {
    swipeRef.current?.swiper?.disable();
    startRecording();
  };

  const handleStopRecording = () => {
    swipeRef.current?.swiper?.enable();
    stopRecording();
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
        <SwiperSlide>
          {
            <div className="flex flex-1 w-full h-screen">
              <VideoPreview stream={previewStream} />
              {mediaUrls[0] && status === "stopped" && (
                <video
                  src={mediaUrls[0]}
                  className={videoClassName}
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              )}
            </div>
          }
        </SwiperSlide>
        <SwiperSlide>
          {
            <div className="flex flex-1 w-full h-screen">
              <VideoPreview stream={previewStream} />
              {mediaUrls[1] && status === "stopped" && (
                <video
                  src={mediaUrls[1]}
                  className={videoClassName}
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              )}
            </div>
          }
        </SwiperSlide>
      </Swiper>
      <div className="absolute bg-red-200 z-20">
        <p>{status}</p>
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </div>
    </>
  );
};

export default RecordView;
