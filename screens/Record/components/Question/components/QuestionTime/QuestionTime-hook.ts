import { useEffect, useRef, useState } from "react"
import { formatCountdown } from "./QuestionTime-functions";

import { QuestionTimeProps } from "./QuestionTime-types"

export const useQuestionTime = ({ recordDate, onStopRecording, time }: QuestionTimeProps) => {
  const [_, setRefresh] = useState(Math.random());

  const countDownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();

  const diff = recordDate
    ? new Date().getTime() / 1000 - recordDate?.getTime() / 1000
    : 0;

  const countDown = Math.round(time - diff);

  const timeString = formatCountdown(countDown);

  useEffect(() => {
    if (countDown === 0) {
      onStopRecording();
    }
  }, [countDown, onStopRecording]);

  useEffect(() => {
    countDownTimeout.current = setInterval(
      () => setRefresh(Math.random()),
      500
    );

    return () => {
      clearInterval(countDownTimeout.current);
    };
  }, []);

  return {
    timeString
  }

}
