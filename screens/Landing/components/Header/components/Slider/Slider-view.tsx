'use client';
import { ReactCompareSlider } from 'react-compare-slider';

const Slider = () => {
  return (
    <div className="relative w-full h-full">
      <ReactCompareSlider
        className="w-full h-full"
        itemOne={
          <iframe
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/e5wsBHP5Ino?rel=0&autoplay=1&mute=1&controls=0&showinfo=0&loop=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
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
