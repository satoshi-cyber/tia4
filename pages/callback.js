import React from "react";

import { Hook } from "../lib";
import { AuthService } from "../services";

export default function Callback() {
  return <Hook hookKey={[AuthService.oAuthCallback]} />;
}
