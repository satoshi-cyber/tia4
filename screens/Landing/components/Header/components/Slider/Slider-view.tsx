'use client';
import { useEffect, useState } from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

const Slider = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 300);
  }, []);

  if (!loading) return <div className="relative w-full h-full bg-black"></div>;

  return (
    <div className="relative w-full h-full">
      <ReactCompareSlider
        className="w-full h-full"
        itemOne={
          <iframe
            loading="lazy"
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/e5wsBHP5Ino?rel=0&playlist=e5wsBHP5Ino&autoplay=1&mute=1&controls=0&showinfo=0&loop=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        }
        itemTwo={
          <iframe
            loading="lazy"
            className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/YN0Q4NjPi8Y?rel=0&playlist=YN0Q4NjPi8Y&autoplay=1&mute=1&controls=0&showinfo=0&loop=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        }
      />
      <p className="absolute -top-14 left-0 text-sm text-gray-600">Business</p>
      <p className="absolute -top-14 right-0 text-sm text-gray-600">Cadidate</p>
    </div>
  );
};

export default Slider;
