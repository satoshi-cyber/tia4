import React from "react";

import { Hook } from "../lib";
import { AuthService } from "../services";

export default function Callback() {
  return (
    <div className="flex flex-row w-full justify-center items-center">
      <Hook hookKey={[AuthService.oAuthCallback]} />
      <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-purple-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
