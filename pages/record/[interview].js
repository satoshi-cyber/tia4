import dynamic from "next/dynamic";
import { Hook } from "../../lib";
import { AuthService } from "../../services";

const Video = dynamic(() => import("../../components/Video"), { ssr: false });

const RecordView = () => (
  <>
    <Hook hookKey={[AuthService.redirect]} />
    <Video />
  </>
);
export default RecordView;
