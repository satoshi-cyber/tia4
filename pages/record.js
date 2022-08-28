import dynamic from "next/dynamic";

const Video = dynamic(() => import("../components/video"), { ssr: false });

const RecordView = () => (
  <div>
    <Video />
  </div>
);

export default RecordView;
