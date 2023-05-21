import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import Slider from './components/Slider';
import Mac from '../../../../public/mac.svg';

export const Header: React.FC = () => {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (isMobile) {
        return;
      }

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
      const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

      const radialGradient: any = document.querySelector('.radial-gradient');

      if (!radialGradient) {
        return;
      }

      radialGradient.style.background =
        'radial-gradient(at ' +
        mouseXpercentage +
        '% ' +
        mouseYpercentage +
        '%, #c084fc, #db2777)';
    };

    document.addEventListener('mousemove', onMove);

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className={`flex flex-col mouse-cursor-gradient-tracking`}>
      <h2
        className={`h-[5rem] md:h-[8rem] text-transparent text-4xl [@media(min-width:380px)]:text-5xl md:!text-8xl !bg-clip-text mb-10 md:mb-20 bg-gradient-to-r from-purple-400 to-pink-600 radial-gradient text-center`}
      >
        #NewAgeHiring
      </h2>
      <div className="mt-16 min-w-full">
        <div className="relative w-full">
          <div className="absolute top-[5.7%] left-[13%] z-10 w-[73.7%] h-[75.1%]">
            <Slider />
          </div>
          <Mac className="z-10 relative pointer-events-none w-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
