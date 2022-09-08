import { useHook } from "../lib";
import { AuthService } from "../services";

export default function Home() {
  useHook([AuthService.redirect]);

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      dashboard
    </div>
  );
}
