import { useRef, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const swiper = useRef();

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true, askPermissionOnMount: true });

  const onStartRecording = () => {
    swiper.current.swiper.disable();
    startRecording();
  };

  const onStopRecording = () => {
    swiper.current.swiper.enable();
    stopRecording();
  };

  return (
    <>
      <Swiper
        ref={swiper}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="absolute flex flex-1 w-full"
      >
        <SwiperSlide>
          {mediaBlobUrl && status === "stopped" && (
            <div className="flex flex-1 w-full">
              <video
                src={mediaBlobUrl}
                className="w-full h-screen object-cover"
                muted
                playsInline
                loop
                autoPlay
              />
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {mediaBlobUrl && status === "stopped" && (
            <div className="flex flex-1 w-full">
              <video
                src={mediaBlobUrl}
                muted
                className="w-full h-screen object-cover"
                playsInline
                loop
                autoPlay
              />
            </div>
          )}
        </SwiperSlide>
      </Swiper>
      <VideoPreview stream={previewStream} />
      <div className="absolute bg-red-200 ">
        <p>{status}</p>
        <button onClick={onStartRecording}>Start Recording</button>
        <button onClick={onStopRecording}>Stop Recording</button>
      </div>
    </>
  );
};

export default RecordView;
