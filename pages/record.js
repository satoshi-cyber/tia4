import VideoRecorder from "react-video-recorder";

const Record = () => (
  <VideoRecorder
    onRecordingComplete={(videoBlob) => {
      // Do something with the video...
      console.log("videoBlob", videoBlob);
    }}
  />
);

export default Record;
