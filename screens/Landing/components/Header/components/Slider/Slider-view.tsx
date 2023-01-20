'use client';
import { ReactCompareSlider } from 'react-compare-slider';

const Slider = () => {
  return (
    <div className="relative w-full h-full">
      <ReactCompareSlider
        className="w-full h-full"
        itemOne={
          <video
            src="/business.mp4"
            playsInline
            muted
            autoPlay
            loop
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        }
        itemTwo={
          <video
            src="/videoplayback.mp4"
            playsInline
            muted
            autoPlay
            loop
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        }
      />
      <p className="absolute -top-14 left-0 text-sm text-gray-600">Business</p>
      <p className="absolute -top-14 right-0 text-sm text-gray-600">Cadidate</p>
    </div>
  );
};

export default Slider;
