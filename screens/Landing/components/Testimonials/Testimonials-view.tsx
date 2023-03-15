import { getAssetUrl } from '@/lib';
import Image from 'next/image';

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
        <Image
          src="/images/ick-logo.svg"
          width={120}
          height={35}
          alt="ick-logo"
        />
      </div>
    </div>
    <div className="w-full md:w-1/2 mb-3 md:mb-4">
      <div className="flex items-center justify-center my-4 md:m-0">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src="/images/uranik-begu.jpg"
            alt="Uranik Begu"
            className="rounded-md"
            fill
          />
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
