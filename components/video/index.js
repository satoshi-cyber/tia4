import { useRef, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const videoClassName =
  "absolute w-full h-full min-w-full min-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover";

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
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true, askPermissionOnMount: true });

  return (
    <>
      <VideoPreview stream={previewStream} />
      {mediaBlobUrl && (
        <video
          src={mediaBlobUrl}
          className={videoClassName}
          playsInline
          loop
          autoPlay
        />
      )}
      <div className="fixed">
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
    </>
  );
};

export default RecordView;
