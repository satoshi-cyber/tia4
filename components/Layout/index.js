import { ShowLoader } from "../../lib";
import Loader from "../Loader";
import Logo from "../../public/logo.svg";

export const Layout = ({ children }) => (
  <div className="flex flex-1 w-full justify-center items-center py-20">
    <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center">
      <Logo className="absolute top-6 left-6" width={120} />
      {children}
      <ShowLoader>
        <Loader />
      </ShowLoader>
    </div>
  </div>
);
