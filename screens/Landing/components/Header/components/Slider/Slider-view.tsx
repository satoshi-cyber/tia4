'use client';
import { ReactCompareSlider } from 'react-compare-slider';

const Slider = () => {
  return (
    <div className="relative w-full h-full bg-black">
      <ReactCompareSlider
        className="w-full h-full"
        itemOne={
          <video
            muted
            autoPlay
            src="https://s3.tebi.io/tia/business.mp4"
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          />
        }
        itemTwo={
          <video
            muted
            autoPlay
            src="videoplayback.mp4"
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          />
        }
      />
      <p className="absolute -top-14 left-0 text-sm text-gray-600">Business</p>
      <p className="absolute -top-14 right-0 text-sm text-gray-600">Cadidate</p>
    </div>
  );
};

export default Slider;
