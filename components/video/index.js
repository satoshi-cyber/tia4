import { useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

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
    <video
      ref={videoRef}
      width="100%"
      height="100%"
      className="absolute top-0 left-0 right-0 bottom-0"
      playsInline
      autoPlay
    />
  );
};

const RecordView = () => (
  <div>
    <ReactMediaRecorder
      video
      render={({
        status,
        startRecording,
        stopRecording,
        previewStream,
        mediaBlobUrl,
      }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <VideoPreview stream={previewStream} />
          {mediaBlobUrl && (
            <video
              src={mediaBlobUrl}
              width="100%"
              height="100%"
              className="absolute top-0 left-0 right-0 bottom-0"
              playsInline
              loop
            />
          )}
        </div>
      )}
    />
  </div>
);

export default RecordView;
