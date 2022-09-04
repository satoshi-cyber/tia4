import dynamic from "next/dynamic";

const Video = dynamic(() => import("../components/Video"), { ssr: false });

const RecordView = () => <Video />;

export default RecordView;
