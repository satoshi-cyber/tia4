import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

export const Header: React.FC = () => (
  <div className={`flex flex-col md:flex-row `}>
    <h2 className={`text-left text-2xl font-thin pb-2 md:w-1/6`}>
      Say <span className={`font-normal`}>goodbye</span> to endless resumes and
      in-person interviews, and{' '}
      <span className={`font-normal text-purple-800`}>hello</span> to a smarter,
      more efficient way
    </h2>
    <div className={`mt-16 scale-105 md:scale-100 md:mt-0 md:w-5/6 `}>
      <div className="relative">
        <div className="absolute top-[5.7%] left-[13%] z-10 w-[73.7%] h-[75.1%]">
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
          </div>
        </div>
        <img
          src="/mac.svg"
          alt="Mac computer"
          className="z-10 relative pointer-events-none"
        />
      </div>
    </div>
  </div>
);

export default Header;
