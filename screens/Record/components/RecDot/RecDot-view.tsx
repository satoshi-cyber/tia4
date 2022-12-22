import { useEffect, useRef, useState } from 'react';
import { CLASS_NAMES } from './RecDot-constants';
import { RecDotProps } from './RecDot-types';

const RecDot: React.FC<RecDotProps> = ({
  recordDate,
  time,
  onStopRecording,
}) => {
  const [_, setRefresh] = useState(Math.random());

  const diff = recordDate
    ? new Date().getTime() / 1000 - recordDate?.getTime() / 1000
    : 0;
  const countDownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();

  const countDown = Math.round(time - diff);

  const timeString = Math.round(countDown / 60) + ':' + (countDown % 60);

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

  return (
    <div className={CLASS_NAMES.container}>
      <span className={CLASS_NAMES.wrapper}>
        <span className={CLASS_NAMES.animation}></span>
        <span className={CLASS_NAMES.dot}></span>
      </span>
      <span className={CLASS_NAMES.time}>{timeString}</span>
    </div>
  );
};

export default RecDot;
