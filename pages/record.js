import dynamic from "next/dynamic";

const Video = dynamic(() => import("../components/video"), { ssr: false });

const RecordView = () => <Video />;

export default RecordView;
