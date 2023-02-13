import { getAssetUrl } from '@/lib';

const Testimonials: React.FC = () => (
  <div className="flex flex-col md:flex-row py-5 md:py-6">
    <div className="w-full md:w-1/2 mb-3 md:mb-4">
      <div className="flex flex-col justify-start items-start md:pr-5">
        <div className="text-left mb-4">
          <p className="text-4xl">Business owners love The Interview</p>
        </div>
        <p className="text-xl font-thin text-left mb-4">
          “The Interview's async video feature is a game-changer, it saves time
          and allows for thorough evaluations of candidates. Highly recommend.”
        </p>
        <p className="text-left mb-3">Uranik Begu, Executive director</p>
        <img
          src={getAssetUrl('/images/ick-logo.svg')}
          className="max-w-[120px]"
          alt="ick-logo"
        />
      </div>
    </div>
    <div className="w-full md:w-1/2 mb-3 md:mb-4">
      <div className="flex items-center justify-center my-4 md:m-0">
        <img
          src={getAssetUrl('/images/uranik-begu.jpg')}
          className="rounded-md"
          alt="Uranik Begu"
        />
      </div>
    </div>
  </div>
);

export default Testimonials;
