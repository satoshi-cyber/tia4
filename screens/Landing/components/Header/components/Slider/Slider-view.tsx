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
            loop
            src="https://tia-cdn.onrender.com/business.mp4"
            className="bg-black absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          />
        }
        itemTwo={
          <video
            muted
            loop
            autoPlay
            src="https://tia-cdn.onrender.com/videoplayback.mp4"
            className="bg-black absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          />
        }
      />
      <p className="absolute -top-14 left-0 text-sm text-gray-600">Business</p>
      <p className="absolute -top-14 right-0 text-sm text-gray-600">Cadidate</p>
    </div>
  );
};

export default Slider;
